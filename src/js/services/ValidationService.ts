import type { CookieType } from '@tdecc/_types/cookie';
import { getCurrentConfig } from './ConfigService';
import { removeCookie } from './CookieService';
import { dispatchChanged, storeCookie } from './EventService';
import { getCurrentCookie } from './PermissionService';

export const reset = (): void => {
  removeCookie(getCurrentConfig().cookieName);
};

export const validate = (): void => {
  const cookie: CookieType = getCurrentCookie();
  const config = getCurrentConfig();
  let validated: boolean = true;

  if (!cookie.info || !cookie.info.v || cookie.info.v !== config.version) {
    validated = false;
  }

  if (!cookie.accepted) {
    validated = false;
  }

  if (config.exceptionUrls.find((item: string): boolean => item === window.location.pathname)) {
    validated = true;
  }

  if (validated) {
    window.tdecc.cookies = cookie;
    dispatchChanged();
    storeCookie(cookie.accepted, cookie.info);
    return;
  }

  reset();
};
