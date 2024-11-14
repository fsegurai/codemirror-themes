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
if (elList) {
  setTimeout(() => {
    for (let i = 0; i < themes.length; ++i) {
      const elItem = document.createElement('md-select-option');
      elItem.setAttribute('value', i.toString());
      const themeItem = document.createElement('div');
      themeItem.slot = 'headline';
      themeItem.textContent = themes[i].name;
      elItem.appendChild(themeItem);
      elList.appendChild(elItem);
    }

    // Select the first option by default
    ;(elList as unknown as { value: string }).value = '0';

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
  }, 1000);
}

export default editor;
