import type { ConfigType } from '../_types/config';

export const domElementsSite = (
  config: ConfigType | undefined = undefined,
): NodeListOf<HTMLElement> => {
  const selector: string = config?.renderSelector || '[data-oymcc-render]';
  return document.querySelectorAll(`${selector}:not([data-oymcc-rendered])`);
};

export const domElementsSiteManageCookies = (): NodeListOf<HTMLLinkElement> =>
  document.querySelectorAll('[href$="#manage-cookies"]');
