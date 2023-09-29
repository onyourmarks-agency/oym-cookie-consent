import { throwError } from '@tdecc/services/ErrorService';
import { renderIconClose } from '@tdecc/templates/icons/close';
import { renderTemplateExplanation } from '@tdecc/templates/overlay-sections/explanation';
import { renderTemplateManage } from '@tdecc/templates/overlay-sections/manage';
import { renderTemplateSplash } from '@tdecc/templates/overlay-sections/splash';

const template = (): string => {
  const { content } = window.tdecc;
  const { config } = window.tdecc;

  if (!content || !content) {
    throwError('Content and config not found');
    return '';
  }

  return `
    <div class="tdecc-content" data-tdeccoverlay data-tdeccoverlay-style-${config.style}>
        <a href="#close" class="tdecc-content__close" data-tdeccoverlay-close-popup>
            ${renderIconClose()}
        </a>
        ${renderTemplateSplash(content?.splash, config)}
        ${renderTemplateManage(content?.manage, config)}
        ${renderTemplateExplanation(config?.explanationAnchors)}
    </div>`;
};

export default template;
