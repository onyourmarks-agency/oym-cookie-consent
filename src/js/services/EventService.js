import { setCookie } from './CookieService';
import { getCurrentCookie } from './PermissionService';
import { domQuerySelectorsConsent } from './DOMService';
import { overlayHide } from './TemplateService';
import { getCurrentConfig } from './ConfigService';

/**
 * Dispatch new event
 * To make it available on further actions
 */
const dispatchChanged = () => {
  document.dispatchEvent(new Event('tdecc-changed'));
};

/**
 * Set all permission to true
 */
const acceptAllOptions = () => {
  const { wrapper } = domQuerySelectorsConsent();

  if (!wrapper) {
    return;
  }

  wrapper.querySelectorAll('input[type="radio"][value="1"]').forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.checked = true;
  });
};

/**
 * Store the cookies
 * @param accepted
 * @param info
 */
const storeCookie = (accepted, info) => {
  if (!accepted || !info) {
    return;
  }

  // Store cookies
  setCookie(getCurrentConfig().cookieName, JSON.stringify({
    accepted,
    info,
  }), 365);

  // Store into window object
  window.tdecc.cookies = {
    accepted,
    info,
  };
};

/**
 * Get all information and store into cookie
 */
const save = () => {
  const domElements = domQuerySelectorsConsent();
  const accepted = ['cookie-accept-essential'];
  const info = {
    v: getCurrentConfig().version,
    accepted: getCurrentCookie()?.info?.accepted || new Date(),
    updated: new Date(),
  };

  // Validate given selection
  if (domElements.optionsAll.length / 2 !== domElements.optionsChoosen.length) {
    // eslint-disable-next-line no-param-reassign
    domElements.errorMessage.style.display = 'block';
    return;
  }

  domElements.optionsChoosen.forEach((input) => {
    if (input.value === '1') {
      accepted.push(input.name);
    }
  });

  // Store cookie and update window object
  storeCookie(accepted, info);

  // Send event
  dispatchChanged();

  // Close and trigger event
  overlayHide();
};

export {
  acceptAllOptions,
  dispatchChanged,
  save,
  storeCookie,
};
