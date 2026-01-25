import { basicSetup, EditorView } from 'codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Compartment, EditorState } from '@codemirror/state';
import { diffMdSample, mdSample } from './utils/markdown.example';
import { applyMergeRevertStyles, themes } from './utils/themes';
import { MergeView, unifiedMergeView } from '@codemirror/merge';

const elCM = document.querySelector('#codemirror')!;
const elDCM = document.querySelector('#diff-codemirror')!;
const elUDCM = document.querySelector('#undiff-codemirror')!;
const themeConfig = new Compartment();

const diffEditor = new MergeView({
  orientation: 'b-a',
  revertControls: 'b-to-a',
  highlightChanges: true,
  gutter: true,
  a: {
    doc: diffMdSample,
    extensions: [
      basicSetup,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
        extensions: [],
      }),
      themeConfig.of([themes[0]]),
    ],
  },
  b: {
    doc: diffMdSample.replace(/t/g, 'T') + '\nSix',
    extensions: [
      basicSetup,
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
        extensions: [],
      }),
      themeConfig.of([themes[0]]),
    ],
  },
  parent: elDCM,
});

const unifiedDiff = new EditorView({
  doc: diffMdSample.replace(/t/g, 'T') + '\nSix',
  extensions: [
    basicSetup,
    unifiedMergeView({
      original: diffMdSample,
    }),
    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
      addKeymap: true,
      extensions: [],
    }),
    themeConfig.of([themes[0]]),
  ],
  parent: elUDCM,
});

const editor = new EditorView({
  doc: mdSample,
  extensions: [
    basicSetup,
    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
      addKeymap: true,
      extensions: [],
    }),
    themeConfig.of([themes[0]]),
  ],
  parent: elCM,
});

const elList = document.querySelector('#theme-list');
const defaultOption = document.querySelector('#defaultOptionValue')!;

if (elList && defaultOption) {
  // Set the value attribute of the default option to "0" to match the first theme
  defaultOption.setAttribute('value', '0');

  for (let i = 0; i < themes.length; ++i) {
    // Create new options for the remaining themes
    const elItem =
      i === 0 ? defaultOption : document.createElement('md-select-option');
    elItem.setAttribute('value', i.toString());
    const themeItem = i === 0
      ? defaultOption.querySelector('div[slot="headline"]')!
      : document.createElement('div');
    themeItem.slot = 'headline';
    themeItem.textContent = themes[i].name;

    if (i !== 0) {
      elItem.appendChild(themeItem);
      elList.appendChild(elItem);
    }
  }

  // Dispatch an initial change to apply the default theme
  setTimeout(() => {
    (elList as HTMLSelectElement).value = '0';
    // Trigger theme application
    elList.dispatchEvent(new Event('change'));
  }, 0);

  elList.classList.remove('hidden');

  elList.addEventListener('change', e => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'MD-OUTLINED-SELECT') {
      const value = (target as unknown as { value: string }).value;
      const i = Number(value);

      diffEditor.a.dispatch({
        effects: themeConfig.reconfigure([themes[i]]),
      });
      diffEditor.b.dispatch({
        effects: themeConfig.reconfigure([themes[i]]),
      });

      unifiedDiff.dispatch({
        effects: themeConfig.reconfigure([themes[i]]),
      });

      editor.dispatch({
        effects: themeConfig.reconfigure([themes[i]]),
      });

      applyMergeRevertStyles(
        themes[i].mergeStyles || {
          backgroundColor: '#f0f0f0',
          borderColor: '#ccc',
          buttonColor: '#333',
          buttonHoverColor: '#ddd',
        },
      );
    }
  });

  elList.classList.remove('hidden');
}

export { diffEditor, unifiedDiff, editor };
