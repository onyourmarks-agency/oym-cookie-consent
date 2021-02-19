import iconArrow from '../icons/arrow';

/**
 * Render anchors for more information
 * @returns {string}
 */
const templateExplanation = (anchors) => {
  if (!anchors.length) {
    return '';
  }

  let template = '';

  for (let i = 0; i < anchors.length; i += 1) {
    template += `<li>
      <a href="${anchors[i].href}">
        ${iconArrow(20, 12)}
        <span>${anchors[i].title}</span>
      </a>
    </li>`;
  }

  return `<ul class="tdecc__links">${template}</ul>`;
};

export default templateExplanation;
