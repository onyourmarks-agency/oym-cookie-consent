import type { ConfigType } from '../_types/config';
import type { DomSelectorsContentType, DomSelectorsWebsiteType } from '../_types/dom';

export const domQuerySelectorsConsent = (): DomSelectorsContentType => ({
  wrapper: document.querySelector('[data-tdeccoverlay]') as HTMLInputElement,
  close: document.querySelector('[data-tdeccoverlay-close-popup]') as HTMLElement,
  manage: document.querySelector('[data-tdeccoverlay-show-manage]') as HTMLButtonElement,
  saveAll: document.querySelectorAll('[data-tdeccoverlay-save-all]') as NodeListOf<HTMLElement>,
  save: document.querySelector('[data-tdeccoverlay-save]') as HTMLElement,
  errorMessage: document.querySelector('[data-tdeccoverlay-error]') as HTMLElement,
  optionsAll: document.querySelectorAll(
    '[data-tdeccoverlay] input[name^="cookie-accept"]'
  ) as NodeListOf<HTMLElement>,
  optionsChoosen: document.querySelectorAll(
    '[data-tdeccoverlay] input[name^="cookie-accept"]:checked'
  ) as NodeListOf<HTMLInputElement>,
  sectionStart: document.querySelector('[data-tdeccoverlay-section-start]') as HTMLElement,
  sectionManage: document.querySelector('[data-tdeccoverlay-section-manage]') as HTMLElement,
});

export const domQuerySelectorsWebsite = (
  config: ConfigType | undefined = undefined
): DomSelectorsWebsiteType => {
  const selector: string = config?.renderSelector || '[data-tdecc-render]';

  return {
    elements: document.querySelectorAll(`${selector}:not([data-tdecc-rendered])`),
    manage: document.querySelectorAll('[href$="#manage-cookies"]'),
  };
};
