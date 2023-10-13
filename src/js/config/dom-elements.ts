import type {ConfigType} from '../_types/config';

export const domElementsSite = (config: ConfigType | undefined = undefined): NodeListOf<HTMLElement> => {
  const selector: string = config?.renderSelector || '[data-tdecc-render]';
  return document.querySelectorAll(`${selector}:not([data-tdecc-rendered])`);
};

export const domElementsSiteManageCookies = (): NodeListOf<HTMLLinkElement> => document.querySelectorAll('[href$="#manage-cookies"]');
