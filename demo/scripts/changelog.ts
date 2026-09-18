import changelog from '../../CHANGELOG.md?raw';
import { mdRender } from './utils/markdown';

const mdBody = document.querySelector('.markdown-body') as HTMLElement;
const loadingSpinner = document.querySelector('#loadingSpinner') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  if (mdBody) {
    mdRender(changelog, mdBody);

    setTimeout(() => {
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
        setTimeout(() => {
          loadingSpinner.style.display = 'none';
        }, 300);
      }
    }, 500);
  }
});
