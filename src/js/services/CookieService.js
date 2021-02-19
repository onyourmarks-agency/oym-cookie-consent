/**
 * Set Cookie
 * @param name
 * @param value
 * @param days
 * @param url
 * @private
 */
const setCookie = (name, value, days, url) => {
  let expires = '';
  let domain = '';

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  }

  if (url) {
    domain = `; domain=${url}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/${domain}; SameSite=Lax;`;
};

/**
 * Read cookie value from given cookiename
 * @param name
 * @returns {string|null}
 */
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

/**
 * Remove a given cookie
 * @param name
 */
const removeCookie = (name) => {
  setCookie(name, null, -1);
};

export {
  getCookie,
  setCookie,
  removeCookie,
};
