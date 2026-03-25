import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import prismjs from 'prismjs';
import ClipboardJS from 'clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

const extensions = [
  markedHighlight({
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = prismjs.languages[lang] ? lang : 'plaintext';
      return prismjs.highlight(code, prismjs.languages[language], language);
    },
  }),
];

marked.use(...extensions, {
  gfm: true,
  breaks: false,
  pedantic: false,
  renderer: {
    link({ href, title, text }) {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    },
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/\W+/g, '-');
      return `
          <h${depth}>
            <a class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${depth}>`;
    },
  },
});

export const mdRender = (md: string, mdBody: HTMLElement | null) => {
  if (!mdBody) return;

  mdBody.innerHTML = marked.parse(md) as string;
  insertCopyElement();
};

const insertCopyElement = () => {
  document.querySelectorAll('pre').forEach((pre) => {
    // Skip if already has a copy button
    if (pre.querySelector('.copy-btn')) return;

    // Get the code element
    const codeElement = pre.querySelector('code');
    const codeText = codeElement?.textContent || pre.textContent || '';

    // Detect language from class
    let language = 'plaintext';
    if (codeElement) {
      const classList = Array.from(codeElement.classList);
      const langClass = classList.find(cls => cls.startsWith('language-'));
      if (langClass) {
        language = langClass.replace('language-', '');
      }
    }

    // Create a toolbar container
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    // Create a language label
    if (language !== 'plaintext') {
      const langLabel = document.createElement('span');
      langLabel.className = 'code-language-label';
      langLabel.textContent = language.toUpperCase();
      langLabel.setAttribute('aria-label', `Code language: ${language}`);
      toolbar.appendChild(langLabel);
    }

    // Create a copy button
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
    button.setAttribute('data-clipboard-text', codeText);
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('type', 'button');

    toolbar.appendChild(button);
    pre.appendChild(toolbar);
  });

  // Initialize ClipboardJS with success/error callbacks
  const clipboard = new ClipboardJS('.copy-btn');

  clipboard.on('success', (e) => {
    const button = e.trigger as HTMLElement;
    showCopySuccess(button);
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    const button = e.trigger as HTMLElement;
    console.error('Copy failed:', e);
    showCopyError(button);
  });
};

/**
 * Show success state on copy button
 */
function showCopySuccess(button: HTMLElement): void {
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
    </svg>
    <span>Copied!</span>
  `;
  button.classList.add('copied');

  setTimeout(() => {
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
    button.classList.remove('copied');
  }, 2000);
}

/**
 * Show error state on copy button
 */
function showCopyError(button: HTMLElement): void {
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM7 11V7h2v4H7zm0-6V3h2v2H7z"/>
    </svg>
    <span>Failed</span>
  `;

  setTimeout(() => {
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
        <path d="M2 6h1v6H2V6z"/>
      </svg>
      <span>Copy</span>
    `;
  }, 2000);
}

