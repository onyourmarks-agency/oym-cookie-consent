import { getCookie } from './CookieService';
import { getCurrentConfig } from './ConfigService';

/**
 * Load current cookie
 * @returns {any|null}
 */
const getCurrentCookie = () => {
  const cookie = getCookie(getCurrentConfig().cookieName) || false;
  return cookie ? JSON.parse(cookie) : null;
};

/**
 * Get all given permissions stored in current cookie
 * @returns {any|null}
 */
const getCurrentPermissions = () => {
  const cookie = getCurrentCookie();

  return cookie?.accepted || null;
};

/**
 * Check the permission given on name or names in string or arrays
 * @param arr
 * @returns {boolean}
 */
const checkPermission = (arr) => {
  if (!arr || !arr.length) {
    return false;
  }

  const prefs = getCurrentPermissions();

  if (!prefs) {
    return false;
  }

  if (typeof arr === 'string') {
    // eslint-disable-next-line no-param-reassign
    arr = arr.split();
  }

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].indexOf('cookie-accept-') === -1) {
      // eslint-disable-next-line no-param-reassign
      arr[i] = `cookie-accept-${arr[i]}`;
    }

    if (prefs.indexOf(arr[i]) === -1) {
      return false;
    }
  }

  return true;
};

export {
  checkPermission,
  getCurrentCookie,
  getCurrentPermissions,
};
