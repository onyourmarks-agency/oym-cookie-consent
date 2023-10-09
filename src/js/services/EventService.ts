import type { CookieAcceptedType, CookieInfoType } from '../_types/cookie';
import { getCurrentConfig } from './ConfigService';
import { setCookie } from './CookieService';
import { domQuerySelectorsConsent } from './DOMService';
import { getCurrentCookie } from './PermissionService';
import { overlayHide } from './TemplateService';

export const dispatchChanged = (): void => {
  document.dispatchEvent(new Event('tdecc-changed'));
};

export const acceptAllOptions = (): void => {
  const { wrapper } = domQuerySelectorsConsent();

  if (!wrapper) {
    return;
  }

  wrapper
    .querySelectorAll('input[type="radio"][value="1"]')
    .forEach((input: HTMLInputElement): void => {
      input.checked = true;
    });
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
    365
  );

  globalThis.tdecc.cookies = {
    accepted,
    info,
  };
};

export const save = (): void => {
  const domElements = domQuerySelectorsConsent();
  const accepted = ['cookie-accept-essential'];
  const info: CookieInfoType = {
    v: getCurrentConfig().version,
    accepted: getCurrentCookie()?.info?.accepted || new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  if (domElements.optionsAll.length / 2 !== domElements.optionsChoosen.length) {
    domElements.errorMessage.style.display = 'block';
    return;
  }

  domElements.optionsChoosen.forEach((input: HTMLInputElement) => {
    if (input.value === '1') {
      accepted.push(input.name);
    }
  });

  storeCookie(accepted, info);
  dispatchChanged();
  overlayHide();
};
