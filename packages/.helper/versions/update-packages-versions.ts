import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import process from 'process';
import { fileURLToPath } from 'url';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
}

interface PkgInfo {
  name: string;
  version: string;
  file: string;
  json: PackageJson;
}

interface Options {
  dryRun: boolean;
  write: boolean;
  skip: string[];
}

const ROOT = process.cwd();
const PACKAGES_GLOB = 'packages/*/package.json';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const STORE_FILE = path.join(SCRIPT_DIR, 'versions.json');
console.log(`${colors.dim}Looking for versions.json at: ${STORE_FILE}${colors.reset}`);

function parseArgs(): Options {
  const argv = process.argv.slice(2);
  const opts: Options = { dryRun: false, write: false, skip: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--write') opts.write = true;
    else if (a === '--skip') {
      const val = argv[++i] || '';
      opts.skip = val.split(',').map(s => s.trim()).filter(Boolean);
    }
    else console.warn(`${colors.yellow}Unknown arg: ${a}${colors.reset}`);
  }
  return opts;
}

async function loadPackages(): Promise<PkgInfo[]> {
  const files = await glob(PACKAGES_GLOB, { cwd: ROOT, absolute: true });
  const pkgs: PkgInfo[] = [];
  for (const f of files) {
    const raw = await fs.readFile(f, 'utf8');
    const json = JSON.parse(raw) as PackageJson;
    if (!json.name) continue;
    pkgs.push({ name: String(json.name), version: json.version || '0.0.0', file: f, json });
  }
  pkgs.sort((a, b) => a.name.localeCompare(b.name));
  return pkgs;
}

async function loadStore(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf8');
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function updateInternalDeps(pkgJson: PackageJson, mapping: Record<string, string>) {
  for (const field of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
    const deps = pkgJson[field];
    if (!deps) continue;
    for (const dep of Object.keys(deps)) {
      const mapped = mapping[dep];
      if (mapped) {
        const current = deps[dep] ?? '';
        deps[dep] = (current.startsWith('^') || current.startsWith('~'))
          ? current[0] + mapped
          : mapped;
      }
    }
  }
}

function printUpdatedTable(updated: { name: string; from: string; to: string }[]) {
  if (!updated.length) return;

  const nameHeader = 'Package';
  const verHeader = 'Old -> New';
  const nameWidth = Math.max(...updated.map(u => u.name.length), nameHeader.length);
  const verWidth = Math.max(...updated.map(u => `${u.from} -> ${u.to}`.length), verHeader.length);

  console.log(`  ${colors.bright}${nameHeader.padEnd(nameWidth)}  ${verHeader}${colors.reset}`);
  console.log(`  ${colors.dim}${'-'.repeat(nameWidth)}  ${'-'.repeat(verWidth)}${colors.reset}`);

  for (const u of updated) {
    console.log(`  ${colors.cyan}${u.name.padEnd(nameWidth)}${colors.reset}  ${colors.gray}${u.from}${colors.reset} ${colors.yellow}→${colors.reset} ${colors.green}${u.to}${colors.reset}`);
  }
}

function printProjectionTable(pkgs: PkgInfo[], targets: Record<string, string>, previousNames: Set<string>) {
  if (!pkgs.length) {
    console.log(`  ${colors.gray}Projection: none${colors.reset}`);
    return;
  }

  const nameHeader = 'Package';
  const curHeader = 'Current';
  const projHeader = 'Projected';
  const statusHeader = 'Status';

  const rows = pkgs.map(p => {
    const current = p.version || '0.0.0';
    const projected = targets[p.name] || current;
    const isNew = !previousNames.has(p.name);
    const status = isNew ? 'new' : (current === projected ? 'unchanged' : 'will change');
    return { name: p.name, current, projected, status };
  });

  const nameWidth = Math.max(...rows.map(r => r.name.length), nameHeader.length);
  const curWidth = Math.max(...rows.map(r => r.current.length), curHeader.length);
  const projWidth = Math.max(...rows.map(r => r.projected.length), projHeader.length);
  const statusWidth = Math.max(...rows.map(r => r.status.length), statusHeader.length);

  console.log(`  ${colors.bright}${nameHeader.padEnd(nameWidth)}  ${curHeader.padEnd(curWidth)}  ${projHeader.padEnd(projWidth)}  ${statusHeader.padEnd(statusWidth)}${colors.reset}`);
  console.log(`  ${colors.dim}${'-'.repeat(nameWidth)}  ${'-'.repeat(curWidth)}  ${'-'.repeat(projWidth)}  ${'-'.repeat(statusWidth)}${colors.reset}`);

  for (const r of rows) {
    const statusColor = r.status === 'will change' ? colors.yellow : r.status === 'new' ? colors.blue : colors.gray;
    const versionColor = r.status === 'will change' ? colors.green : colors.gray;
    console.log(`  ${colors.cyan}${r.name.padEnd(nameWidth)}${colors.reset}  ${colors.gray}${r.current.padEnd(curWidth)}${colors.reset}  ${versionColor}${r.projected.padEnd(projWidth)}${colors.reset}  ${statusColor}${r.status.padEnd(statusWidth)}${colors.reset}`);
  }
}

async function main() {
  const opts = parseArgs();
  const pkgs = await loadPackages();
  const store = await loadStore();

  const previousNames = new Set(Object.keys(store));
  const newPackages = pkgs.filter(p => !previousNames.has(p.name)).map(p => p.name);
  const missingInStore = pkgs.filter(p => !store[p.name]).map(p => p.name);

  // versions.json is the source of truth - use it as target versions
  const targets: Record<string, string> = { ...store };

  // For packages not in versions.json, use their current version
  for (const p of pkgs) {
    if (!targets[p.name]) {
      targets[p.name] = p.version;
    }
  }

  const internalMapping: Record<string, string> = {};
  for (const [name, ver] of Object.entries(targets)) internalMapping[name] = ver;

  const report = {
    updated: [] as { name: string; from: string; to: string }[],
    skipped: [] as string[],
    new: newPackages,
    missingInStore,
    bundleChanges: [] as string[],
  };

  // Track which packages will be updated for bundle dependency updates
  const updatedPackages: Record<string, string> = {};

  for (const p of pkgs) {
    const target = targets[p.name];
    if (!target) continue;

    // Check if the package should be skipped
    if (opts.skip.includes(p.name)) {
      if (p.version !== target) {
        report.skipped.push(p.name);
      }
      continue;
    }

    if (p.version === target) continue;

    report.updated.push({ name: p.name, from: p.version, to: target });
    updatedPackages[p.name] = target;
    p.json.version = target;
    updateInternalDeps(p.json, internalMapping);
    if (opts.write && !opts.dryRun) {
      await fs.writeFile(p.file, JSON.stringify(p.json, null, 2) + '\n', 'utf8');
    }
  }

  report.updated.sort((a, b) => a.name.localeCompare(b.name));

  // Update bundle package dependencies to match updated packages
  const bundlePkg = pkgs.find(p => p.name === '@fsegurai/codemirror-theme-bundle');
  if (bundlePkg && Object.keys(updatedPackages).length > 0) {
    let bundleUpdated = false;
    const bundleChanges: string[] = [];
    const deps = bundlePkg.json.dependencies;

    if (deps) {
      for (const [pkgName, newVersion] of Object.entries(updatedPackages)) {
        if (deps[pkgName]) {
          const currentDepVersion = deps[pkgName];
          const prefix = currentDepVersion.startsWith('^') ? '^' : currentDepVersion.startsWith('~') ? '~' : '';
          const newDepVersion = prefix + newVersion;

          if (deps[pkgName] !== newDepVersion) {
            const oldVersion = deps[pkgName];
            deps[pkgName] = newDepVersion;
            bundleUpdated = true;
            bundleChanges.push(`  ${colors.cyan}${pkgName}${colors.reset}: ${colors.gray}${oldVersion}${colors.reset} ${colors.yellow}→${colors.reset} ${colors.green}${newDepVersion}${colors.reset}`);
          }
        }
      }
    }

    if (bundleUpdated) {
      if (opts.write && !opts.dryRun) {
        await fs.writeFile(bundlePkg.file, JSON.stringify(bundlePkg.json, null, 2) + '\n', 'utf8');
      }

      // Store bundle changes in report
      report.bundleChanges = bundleChanges;
    }
  }

  // Show summary
  console.log(`${colors.bright}${colors.blue}Summary:${colors.reset}`);
  console.log(`  ${colors.dim}Packages scanned:${colors.reset} ${colors.cyan}${pkgs.length}${colors.reset}`);

  if (report.missingInStore.length) {
    console.log(`  ${colors.yellow}⚠️  Warning:${colors.reset} ${report.missingInStore.length} package(s) not found in versions.json - using current versions`);
  }

  if (report.skipped.length) {
    console.log(`  ${colors.yellow}Skipped:${colors.reset} ${report.skipped.join(', ')}`);
  }

  // In preview mode, show detailed projection
  if (opts.dryRun || !opts.write) {
    console.log(`\n${colors.bright}${colors.green}Preview - Changes that will be applied:${colors.reset}`);
    if (report.updated.length) {
      printUpdatedTable(report.updated);
    } else {
      console.log(`  ${colors.gray}No changes needed - all packages are up to date${colors.reset}`);
    }

    // Show bundle changes if any
    if (report.bundleChanges.length > 0) {
      console.log(`\n${colors.bright}${colors.blue}Bundle Package Dependencies:${colors.reset}`);
      console.log(`  ${colors.cyan}@fsegurai/codemirror-theme-bundle${colors.reset} will update ${colors.bright}${report.bundleChanges.length}${colors.reset} dependencies:`);
      for (const change of report.bundleChanges) {
        console.log(change);
      }
    }

    console.log(`\n${colors.bright}${colors.blue}Full Projection:${colors.reset}`);
    printProjectionTable(pkgs, targets, previousNames);

    console.log(`\n${colors.green}✓${colors.reset} ${colors.dim}Preview complete. Use ${colors.bright}--write${colors.reset}${colors.dim} to apply changes.${colors.reset}`);
  } else {
    // In writing mode, just show what was updated
    console.log(`\n${colors.bright}${colors.green}Applied Changes:${colors.reset}`);
    if (report.updated.length) {
      printUpdatedTable(report.updated);
      console.log(`\n${colors.green}✓${colors.reset} ${colors.bright}${report.updated.length}${colors.reset} package(s) updated successfully.`);
    } else {
      console.log(`  ${colors.gray}No changes applied - all packages were already up to date${colors.reset}`);
    }

    // Show bundle changes if any
    if (report.bundleChanges.length > 0) {
      console.log(`\n${colors.bright}${colors.blue}Bundle Package:${colors.reset}`);
      console.log(`  ${colors.cyan}@fsegurai/codemirror-theme-bundle${colors.reset} updated ${colors.bright}${report.bundleChanges.length}${colors.reset} dependencies:`);
      for (const change of report.bundleChanges) {
        console.log(change);
      }
    }
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

