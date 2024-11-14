import { marked } from 'marked';

document.addEventListener('DOMContentLoaded', () => {
  const elMD = document.querySelector('.markdown-body');
  const readmeURL =
    'https://raw.githubusercontent.com/fsegurai/codemirror-themes/refs/heads/main/README.md';

  if (elMD) {
    fetch(readmeURL)
      .then(response => response.text())
      .then(text => {
        elMD.innerHTML = marked.parse(text) as string;
      })
      .catch(error => {
        elMD.innerHTML = `
          <p>Failed to load README.md</p>
          
          <p>${error}</p>
          `;
      });
  }
});
