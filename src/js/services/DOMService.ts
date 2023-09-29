import type { ConfigType } from '@tdecc/_types/config';
import type { DomSelectorsContentType, DomSelectorsWebsiteType } from '@tdecc/_types/dom';

export const domQuerySelectorsConsent = (): DomSelectorsContentType => ({
  wrapper: document.querySelector('[data-tdeccoverlay]'),
  close: document.querySelector('[data-tdeccoverlay-close-popup]'),
  manage: document.querySelector('[data-tdeccoverlay-show-manage]'),
  saveAll: document.querySelectorAll('[data-tdeccoverlay-save-all]'),
  save: document.querySelector('[data-tdeccoverlay-save]'),
  errorMessage: document.querySelector('[data-tdeccoverlay-error]'),
  optionsAll: document.querySelectorAll('[data-tdeccoverlay] input[name^="cookie-accept"]'),
  optionsChoosen: document.querySelectorAll(
    '[data-tdeccoverlay] input[name^="cookie-accept"]:checked'
  ),
  sectionStart: document.querySelector('[data-tdeccoverlay-section-start]'),
  sectionManage: document.querySelector('[data-tdeccoverlay-section-manage]'),
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
