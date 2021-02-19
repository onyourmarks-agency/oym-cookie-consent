import sectionSplash from './overlay-sections/splash';
import sectionManage from './overlay-sections/manage';
import sectionExplanation from './overlay-sections/explanation';
import iconClose from './icons/close';
import throwError from '../fns/throw-error';

const template = () => {
  const { content } = window.tdecc;
  const { config } = window.tdecc;

  if (!content || !content) {
    return throwError('Content and config not found');
  }

  return `
    <div class="tdecc-content" data-tdeccoverlay data-tdeccoverlay-style-${config.style}>
        <a href="#close" class="tdecc-content__close" data-tdeccoverlay-close-popup>
            ${iconClose()}
        </a>
        ${sectionSplash(content?.splash, config)}
        ${sectionManage(content?.manage, config)}
        ${sectionExplanation(config?.explanationAnchors)}
    </div>`;
};

export default template;
