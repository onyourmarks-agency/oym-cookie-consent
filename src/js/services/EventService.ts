import type { CookieAcceptedType, CookieInfoType } from '../_types/cookie';
import { getCurrentConfig } from './ConfigService';
import { setCookie } from './CookieService';

export const dispatchChanged = (): void => {
  document.dispatchEvent(new Event('tdecc-changed'));
};

export const dispatchCloseOverlay = (): void => {
  document.dispatchEvent(new Event('tdecc-close-overlay'));
};

export const storeCookie = (accepted: CookieAcceptedType, info: CookieInfoType): void => {
  if (!accepted || !info) {
    return;
  }

  setCookie(
    getCurrentConfig().cookieName,
    JSON.stringify({
      accepted,
      info,
    }),
    365,
  );

  globalThis.tdecc.cookies = {
    accepted,
    info,
  };
};
