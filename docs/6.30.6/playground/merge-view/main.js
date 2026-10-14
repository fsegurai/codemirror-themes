import { MergeView } from '@codemirror/merge';
import { Compartment } from '@codemirror/state';
import { applyMergeRevertStyles, githubDark, githubDarkMergeStyles } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight, githubLightMergeStyles } from '@fsegurai/codemirror-theme-github-light';
import { basicSetup } from 'codemirror';

// Each theme package also exports <theme>MergeStyles for the revert column between the editors.
const themes = {
  light: { extension: githubLight, mergeStyles: githubLightMergeStyles },
  dark: { extension: githubDark, mergeStyles: githubDarkMergeStyles },
};

const themeConfig = new Compartment();
const merge = new MergeView({
  a: { doc: 'one\ntwo\nthree\n', extensions: [basicSetup, themeConfig.of(themes.dark.extension)] },
  b: { doc: 'one\nTwo\nthree\nfour\n', extensions: [basicSetup, themeConfig.of(themes.dark.extension)] },
  orientation: 'b-a',
  revertControls: 'b-to-a',
  highlightChanges: true,
  gutter: true,
  parent: document.querySelector('#merge'),
});

let mode = 'dark';
function useTheme(next) {
  mode = next;
  const { extension, mergeStyles } = themes[mode];
  merge.a.dispatch({ effects: themeConfig.reconfigure(extension) });
  merge.b.dispatch({ effects: themeConfig.reconfigure(extension) });
  // Injects <style id="cm-merge-revert-styles"> into the page, replacing the previous one.
  applyMergeRevertStyles(mergeStyles);
  console.log(`Merge view theme: ${mode}`);
}

useTheme('dark');
document.querySelector('#toggle').addEventListener('click', () => useTheme(mode === 'dark' ? 'light' : 'dark'));
