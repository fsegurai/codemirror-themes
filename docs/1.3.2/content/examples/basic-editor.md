---
label: Basic Editor
description: A Markdown editor themed with Tokyo Night Storm.
order: 1
tags: [ "examples", "editor", "markdown" ]
---

# Basic Editor

```bash
npm install codemirror @codemirror/lang-markdown @fsegurai/codemirror-theme-tokyo-night-storm
```

```html
<div id="editor"></div>
<script type="module" src="./main.ts"></script>
```

```ts
// main.ts
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup, EditorView } from 'codemirror';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';

new EditorView({
  doc: '# Hello World\n\nSome *emphasis* and `code`.',
  extensions: [basicSetup, markdown(), tokyoNightStorm],
  parent: document.querySelector('#editor')!,
});
```

Expected result: a dark editor with background `#24283b`, colored headings, emphasis and inline code.
