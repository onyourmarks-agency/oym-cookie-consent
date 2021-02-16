import templateConsent from '../templates/popup-wrapper';

const render = () => {
  const popup = document.createElement('div');
  popup.className = 'tdecc';
  popup.innerHTML = templateConsent();

  document.body.appendChild(popup);
}

export default render;
