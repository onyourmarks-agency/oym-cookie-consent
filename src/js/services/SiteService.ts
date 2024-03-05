import { domElementsSiteManageCookies } from '../config/dom-elements';
import { OYMCC_SECTION_MANAGE } from '../config/sections';
import { activeSection } from '../store/active-section';
import { overlayShow } from './TemplateService';

export const handleManageCookieElements = (): void => {
  const elements: NodeListOf<HTMLLinkElement> = domElementsSiteManageCookies();

  if (!elements.length) {
    return;
  }

  elements.forEach((linkElement: HTMLLinkElement) => {
    linkElement.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();

      activeSection.set(OYMCC_SECTION_MANAGE);
      overlayShow(true);
    });
  });
};
