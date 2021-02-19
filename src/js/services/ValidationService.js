import { getCurrentCookie } from './PermissionService';
import { removeCookie } from './CookieService';
import { dispatchChanged } from './EventService';
import { getCurrentConfig } from './ConfigService';

/**
 * Reset cookie
 * Write empty cookie in history
 */
const reset = () => {
  removeCookie(getCurrentConfig().cookieName);
};

/**
 * Checkpoints to validate if existing cookie is valid
 * Valid? Store and dispatch event
 * Not valid? Reset
 */
const validate = () => {
  const cookie = getCurrentCookie();
  let validated = true;

  if (!cookie.info || !cookie.info.v || cookie.info.v !== getCurrentConfig().version) {
    validated = false;
  }

  if (!cookie.accepted) {
    validated = false;
  }

  if (getCurrentConfig().exceptionUrls.indexOf(window.location.pathname) > -1) {
    validated = true;
  }

  if (validated) {
    window.tdecc.cookies = cookie;
    dispatchChanged();
  } else {
    reset();
  }
};

export {
  reset,
  validate,
};
