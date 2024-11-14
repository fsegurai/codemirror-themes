import { basicSetup, EditorView } from 'codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Compartment } from '@codemirror/state';
import mdSample from '../markdown.example';
import themes from '../themes';

const elCM = document.querySelector('#codemirror')!;
const themeConfig = new Compartment();

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

if (elList) {
  setTimeout(() => {
    for (let i = 0; i < themes.length; ++i) {
      // Create new options for the remaining themes
      const elItem =
        i === 0 ? defaultOption : document.createElement('md-select-option');
      elItem.setAttribute('value', i.toString());
      const themeItem = document.createElement('div');
      themeItem.slot = 'headline';
      themeItem.textContent = themes[i].name;
      if (i === 0) {
        // Update the default option
        defaultOption.querySelector('div[slot="headline"]')!.textContent = themes[i].name;
      } else {
        elItem.appendChild(themeItem);
      }
      elList.appendChild(elItem);
    }

    elList.addEventListener('change', e => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'MD-OUTLINED-SELECT') {
        const value = (target as unknown as { value: string }).value;
        const i = Number(value);

        editor.dispatch({
          effects: themeConfig.reconfigure([themes[i]]),
        });
      }
    });

    elList.classList.remove('hidden');
  }, 500);
}

export default editor;
