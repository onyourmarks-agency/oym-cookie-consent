import type { ConfigType } from '../_types/config';
import type { CookieType } from '../_types/cookie';
import { getCurrentConfig } from './ConfigService';
import { removeCookie } from './CookieService';
import { dispatchChanged, storeCookie } from './EventService';
import { getCurrentCookie } from './PermissionService';
import { overlayShow } from './TemplateService';

export const reset = (): void => {
  removeCookie(getCurrentConfig().cookieName);
};

export const validate = (): void => {
  const cookie: CookieType | null = getCurrentCookie();
  if (!cookie) {
    return;
  }

  const config: ConfigType = getCurrentConfig();
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
    globalThis.oymcc.cookies = cookie;
    storeCookie(cookie.accepted, cookie.info);
    dispatchChanged();
    return;
  }

  reset();
  overlayShow();
};
