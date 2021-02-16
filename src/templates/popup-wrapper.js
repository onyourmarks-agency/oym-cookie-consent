import sectionSplash from './sections/splash';
import sectionManage from './sections/manage';
import sectionExplanation from './sections/explanation';

const template = () => {
  const content = window.tdecc.content;
  const config = window.tdecc.config;

  return `
    <div class="tdecc-content">
        <a href="#close" data-tdecc-closepopup></a>
        ${sectionSplash(content.splash)}
        ${sectionManage(content.manage, config.consentOptions)}
        ${sectionExplanation(config.explanationAnchors)}
    </div>`;
};

export default template;
