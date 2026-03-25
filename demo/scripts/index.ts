import { mdRender } from './utils/markdown';

const mdBody = document.querySelector('.markdown-body') as HTMLElement;
const loadingSpinner = document.querySelector('#loadingSpinner') as HTMLElement;
const readmeURL =
    'https://raw.githubusercontent.com/fsegurai/codemirror-themes/refs/heads/main/README.md';

document.addEventListener('DOMContentLoaded', () => {
  if (mdBody) {
    fetch(readmeURL)
      .then(response => response.text())
      .then(text => {
        mdRender(text, mdBody);

        // Hide loading spinner after content is rendered
        setTimeout(() => {
          if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
              loadingSpinner.style.display = 'none';
            }, 300);
          }
        }, 500);
      })
      .catch(error => {
        mdBody.innerHTML = `
          <div style="text-align: center; padding: 40px;">
            <h2 style="color: var(--md-sys-color-error);">Failed to load README.md</h2>
            <p style="color: var(--md-sys-color-on-surface);">${ error }</p>
          </div>
        `;

        // Hide loading spinner on error too
        if (loadingSpinner) {
          loadingSpinner.classList.add('hidden');
          setTimeout(() => {
            loadingSpinner.style.display = 'none';
          }, 300);
        }
      });
  }
});
