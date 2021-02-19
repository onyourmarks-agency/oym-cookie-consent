/**
 * Find all domQuerySelectors for
 * @returns {{
 *   optionsChoosen: NodeListOf<Element>,
 *   saveAll: NodeListOf<Element>,
 *   save: Element,
 *   errorMessage: Element,
 *   wrapper: Element,
 *   close: Element,
 *   manage: Element,
 *   optionsAll: NodeListOf<Element>
 *   sectionStart: Element,
 *   sectionManage: Element,
 * }}
 */
const domQuerySelectorsConsent = () => ({
  wrapper: document.querySelector('[data-tdeccoverlay]'),
  close: document.querySelector('[data-tdeccoverlay-close-popup]'),
  manage: document.querySelector('[data-tdeccoverlay-show-manage]'),
  saveAll: document.querySelectorAll('[data-tdeccoverlay-save-all]'),
  save: document.querySelector('[data-tdeccoverlay-save]'),
  errorMessage: document.querySelector('[data-tdeccoverlay-error]'),
  optionsAll: document.querySelectorAll('[data-tdeccoverlay] input[name^="cookie-accept"]'),
  optionsChoosen: document.querySelectorAll('[data-tdeccoverlay] input[name^="cookie-accept"]:checked'),
  sectionStart: document.querySelector('[data-tdeccoverlay-section-start]'),
  sectionManage: document.querySelector('[data-tdeccoverlay-section-manage]'),
});

/**
 * Find all website selectors
 * @param config
 * @returns {{elements: NodeListOf<Element>}}
 */
const domQuerySelectorsWebsite = (config) => {
  const selector = config?.renderSelector || '[data-tdecc-render]';

  return {
    elements: document.querySelectorAll(`${selector}:not([data-tdecc-rendered])`),
    manage: document.querySelectorAll('[href$="#manage-cookies"]'),
  };
};

export {
  domQuerySelectorsConsent,
  domQuerySelectorsWebsite,
};
