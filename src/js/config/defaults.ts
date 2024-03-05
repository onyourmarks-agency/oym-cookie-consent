import type { ConfigType } from '../_types/config';

export const OYMCC_CLASSNAME: string = 'oymcc';

export const OYMCC_CONFIG: ConfigType = {
  consentOptions: [],
  cookieName: 'oymcc',
  exceptionUrls: [],
  explanationAnchors: [],
  language: 'nl',
  manageable: true,
  style: 'bar',
  renderSelector: '[data-oymcc-render]',
  version: '1.0',
};
