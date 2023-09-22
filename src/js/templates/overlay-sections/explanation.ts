import type { ConfigExplanationAnchorType } from '@js/_types/config';
import { renderIconArrow } from '@js/templates/icons/arrow';

export const renderTemplateExplanation = (anchors: ConfigExplanationAnchorType[]): string => {
  if (!anchors.length) {
    return '';
  }

  let template: string = '';

  for (let i: number = 0; i < anchors.length; i += 1) {
    template += `<li>
      <a href="${anchors[i].href}">
        ${renderIconArrow(20, 12)}
        <span>${anchors[i].title}</span>
      </a>
    </li>`;
  }

  return `<ul class="tdecc__links">${template}</ul>`;
};
