import { acceptAllOptions, save } from './EventService';
import { showManagerSection, overlayHide, overlayShow } from './TemplateService';
import { domQuerySelectorsConsent, domQuerySelectorsWebsite } from './DOMService';

const handleClickListnersPopup = () => {
  const domElements = domQuerySelectorsConsent();

  /**
   * Save
   */
  if (domElements.save) {
    domElements.save.addEventListener('click', (e) => {
      e.preventDefault();

      save();
    });
  }

  /**
   * Save all
   */
  if (domElements.saveAll) {
    domElements.saveAll.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        acceptAllOptions();
        save();
      });
    });
  }

  /**
   * Close
   */
  if (domElements.close) {
    domElements.close.addEventListener('click', (e) => {
      e.preventDefault();

      overlayHide();
    });
  }

  /**
   * Manage
   */
  if (domElements.manage) {
    domElements.manage.addEventListener('click', (e) => {
      e.preventDefault();

      showManagerSection();
    });
  }
};

const handleClickListenersContent = () => {
  const siteElements = domQuerySelectorsWebsite();

  if (siteElements.manage) {
    siteElements.manage.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        overlayShow(true);
        showManagerSection();
      });
    });
  }
};

export {
  handleClickListnersPopup,
  handleClickListenersContent,
};
