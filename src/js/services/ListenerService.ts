import type { DomSelectorsContentType, DomSelectorsWebsiteType } from '../_types/dom';
import { domQuerySelectorsConsent, domQuerySelectorsWebsite } from './DOMService';
import { acceptAllOptions, save } from './EventService';
import { showManagerSection, overlayHide, overlayShow } from './TemplateService';

export const handleClickListenersPopup = (): void => {
  const domElements: DomSelectorsContentType = domQuerySelectorsConsent();

  if (domElements.save) {
    domElements.save.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();

      save();
    });
  }

  if (domElements.saveAll) {
    domElements.saveAll.forEach((item: HTMLElement): void => {
      item.addEventListener('click', (e: MouseEvent): void => {
        e.preventDefault();

        acceptAllOptions();
        save();
      });
    });
  }

  if (domElements.close) {
    domElements.close.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();

      overlayHide();
    });
  }

  if (domElements.manage) {
    domElements.manage.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();

      showManagerSection();
    });
  }
};

export const handleClickListenersContent = () => {
  const siteElements: DomSelectorsWebsiteType = domQuerySelectorsWebsite();

  if (siteElements.manage) {
    siteElements.manage.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();

        overlayShow(true);
        showManagerSection();
      });
    });
  }
};
