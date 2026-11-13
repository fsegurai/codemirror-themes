import { markdown } from '@codemirror/lang-markdown';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';
import { basicSetup, EditorView } from 'codemirror';

// A theme is a plain CodeMirror Extension: add it next to basicSetup and the language.
new EditorView({
  doc: '# Hello World\n\nSome *emphasis*, **strong text** and `inline code`.\n\n- a list item\n- [a link](https://codemirror.net)\n',
  extensions: [basicSetup, markdown(), tokyoNightStorm],
  parent: document.querySelector('#editor'),
});

console.log('Editor ready with Tokyo Night Storm');
