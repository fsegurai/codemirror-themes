---
label: Angular
description: A standalone Angular component that creates a themed CodeMirror editor, switches themes with signals and cleans up on destroy.
order: 7
tags: [ "integration", "angular" ]
keywords: [ "standalone component", "signals", "viewChild", "DestroyRef" ]
---

# Angular

```bash
npm install codemirror @codemirror/lang-javascript @fsegurai/codemirror-theme-bundle
```

## Editor component

The component creates the editor after its host element is rendered, reconfigures the theme whenever the `theme`
input changes, and destroys the editor with the component.

```ts
import { afterNextRender, Component, DestroyRef, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { javascript } from '@codemirror/lang-javascript';
import { Compartment, type Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';

@Component({
  selector: 'app-code-editor',
  template: '<div #host class="editor"></div>',
})
export class CodeEditorComponent {
  readonly theme = input.required<Extension>();
  readonly doc = input('');

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly themeConfig = new Compartment();
  private view?: EditorView;

  constructor() {
    afterNextRender(() => {
      this.view = new EditorView({
        doc: this.doc(),
        extensions: [basicSetup, javascript(), this.themeConfig.of(this.theme())],
        parent: this.host().nativeElement,
      });
    });

    effect(() => {
      const theme = this.theme();
      this.view?.dispatch({ effects: this.themeConfig.reconfigure(theme) });
    });

    inject(DestroyRef).onDestroy(() => this.view?.destroy());
  }
}
```

## Use it

```ts
import { Component, signal } from '@angular/core';
import { githubDark, githubLight } from '@fsegurai/codemirror-theme-bundle';
import { CodeEditorComponent } from './code-editor.component';

@Component({
  selector: 'app-root',
  imports: [CodeEditorComponent],
  template: `
    <button type="button" (click)="dark.set(!dark())">Toggle theme</button>
    <app-code-editor [theme]="dark() ? githubDark : githubLight" doc="const answer = 42;" />
  `,
})
export class AppComponent {
  protected readonly dark = signal(true);
  protected readonly githubDark = githubDark;
  protected readonly githubLight = githubLight;
}
```

## Notes

- `afterNextRender` runs only in the browser, so the editor is never created during server-side rendering.
- Call `applyMergeRevertStyles(<theme>MergeStyles)` in `afterNextRender` or in an `effect` guarded the same way.
- To follow the system color scheme, read `window.matchMedia('(prefers-color-scheme: dark)')` in the browser and set
  the `dark` signal from it. See [Following the System Color Scheme](../guides/light-dark-mode.md).
