---
label: React
description: A React component that creates a themed CodeMirror editor with useRef and useEffect, and the same setup with @uiw/react-codemirror.
order: 8
tags: [ "integration", "react" ]
keywords: [ "useEffect", "useRef", "hooks", "@uiw/react-codemirror" ]
---

# React

```bash
npm install codemirror @codemirror/lang-javascript @fsegurai/codemirror-theme-bundle
```

## Editor component

Create the editor once in an effect, reconfigure the theme in a second effect, and destroy the editor on unmount.

```tsx
import { javascript } from '@codemirror/lang-javascript';
import { Compartment, type Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  doc: string;
  theme: Extension;
}

export function CodeEditor({ doc, theme }: CodeEditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const themeConfig = useRef(new Compartment());

  useEffect(() => {
    if (!host.current) return;
    view.current = new EditorView({
      doc,
      extensions: [basicSetup, javascript(), themeConfig.current.of(theme)],
      parent: host.current,
    });
    return () => {
      view.current?.destroy();
      view.current = null;
    };
    // Create the editor once; later changes go through the compartment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    view.current?.dispatch({ effects: themeConfig.current.reconfigure(theme) });
  }, [theme]);

  return <div ref={host} />;
}
```

## Use it

```tsx
import { githubDark, githubLight } from '@fsegurai/codemirror-theme-bundle';
import { useState } from 'react';
import { CodeEditor } from './CodeEditor';

export function App() {
  const [dark, setDark] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setDark(!dark)}>
        Toggle theme
      </button>
      <CodeEditor doc="const answer = 42;" theme={dark ? githubDark : githubLight} />
    </>
  );
}
```

Theme values are module constants, so passing them as props never triggers extra reconfigurations.

## With `@uiw/react-codemirror`

The wrapper accepts any `Extension` in its `theme` prop:

```tsx
import { javascript } from '@codemirror/lang-javascript';
import { nord } from '@fsegurai/codemirror-theme-nord';
import CodeMirror from '@uiw/react-codemirror';

export function App() {
  return <CodeMirror value="const answer = 42;" theme={nord} extensions={[javascript()]} />;
}
```

## Notes

- React Strict Mode runs effects twice in development; the cleanup above destroys the first editor, so only one
  remains.
- With server-side rendering (Next.js and similar), effects only run in the browser, so the editor and
  `applyMergeRevertStyles` never run on the server.
