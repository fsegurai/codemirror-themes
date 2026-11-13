import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { highlightActiveLine, lineNumbers } from '@codemirror/view';
import * as bundle from '@fsegurai/codemirror-theme-bundle';
import { EditorView } from 'codemirror';

// The bundle re-exports every theme package, so the gallery always shows the themes of this release.
const themes = Object.entries(bundle)
  .filter(([name]) => !name.endsWith('MergeStyles') && name !== 'applyMergeRevertStyles')
  .map(([name, extension]) => ({
    name,
    extension,
    dark: EditorState.create({ extensions: extension }).facet(EditorView.darkTheme),
  }));

// The same snippet in every card: a comment, keywords, a function, a string, a template, a number and an error.
const snippet = [
  '// Greets someone n times',
  'const greet = (name, n = 1) => {',
  '  if (!name) throw new Error("name is required");',
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  '  return `Hello, ${name}! `.repeat(n);',
  '};',
  'export default greet;',
].join('\n');

const gallery = document.querySelector('#gallery');
const cards = themes.map((theme) => {
  const item = document.createElement('li');
  item.dataset.kind = theme.dark ? 'dark' : 'light';
  item.innerHTML = `<figure><figcaption><code></code><span class="badge"></span></figcaption><div class="frame"></div></figure>`;
  item.querySelector('code').textContent = theme.name;
  item.querySelector('.badge').textContent = item.dataset.kind;
  gallery.append(item);

  // A small, read-only editor: no basicSetup, just what shows the theme (gutter, active line, syntax colors).
  new EditorView({
    doc: snippet,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      javascript(),
      theme.extension,
      EditorState.readOnly.of(true),
      // Not editable, so the 33 previews are not 33 extra tab stops for keyboard users.
      EditorView.editable.of(false),
    ],
    parent: item.querySelector('.frame'),
  });
  return item;
});

const count = document.querySelector('#count');
function applyFilter() {
  const kind = new FormData(document.querySelector('#filter')).get('kind');
  let shown = 0;
  for (const card of cards) {
    card.hidden = kind !== 'all' && card.dataset.kind !== kind;
    if (!card.hidden) shown += 1;
  }
  count.textContent = `${shown} of ${cards.length} themes`;
}

document.querySelector('#filter').addEventListener('change', applyFilter);
applyFilter();
console.log(`Rendered ${cards.length} themes`);
