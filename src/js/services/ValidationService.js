import { getCurrentCookie } from './PermissionService';
import { removeCookie } from './CookieService';
import { dispatchChanged, storeCookie } from './EventService';
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
  const config = getCurrentConfig();
  let validated = true;

  if (!cookie.info || !cookie.info.v || cookie.info.v !== config.version) {
    validated = false;
  }

  if (!cookie.accepted) {
    validated = false;
  }

  if (config.exceptionUrls.indexOf(window.location.pathname) > -1) {
    validated = true;
  }

  if (validated) {
    window.tdecc.cookies = cookie;
    dispatchChanged();
    storeCookie(cookie.accepted, cookie.info);
  } else {
    reset();
  }
};

export {
  reset,
  validate,
};
