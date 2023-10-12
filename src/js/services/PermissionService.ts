import type { CookieAcceptedType, CookieType } from '../_types/cookie';
import { getCurrentConfig } from './ConfigService';
import { getCookie } from './CookieService';

export const getCurrentCookie = (): CookieType | null => {
  const cookie: string | false = getCookie(getCurrentConfig().cookieName) || false;
  return cookie ? (JSON.parse(cookie) as CookieType) : null;
};

export const getCurrentPermissions = () => {
  const cookie: CookieType | null = getCurrentCookie();
  return cookie?.accepted || [];
};

export const checkPermission = (arr: string[] | string): boolean => {
  if (!arr || !arr.length) {
    return false;
  }

  const prefs: CookieAcceptedType | null = getCurrentPermissions();

  if (!prefs) {
    return false;
  }

  const items: string[] = typeof arr === 'string' ? arr.split('') : arr;

  for (let i: number = 0; i < items.length; i += 1) {
    if (items[i].indexOf('cookie-accept-') === -1) {
      items[i] = `cookie-accept-${items[i]}`;
    }

    if (!prefs.find((pref => pref === items[i]))) {
      return false;
    }
  }

  return true;
};
