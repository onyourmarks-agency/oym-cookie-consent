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

  document.cookie = `${name}=${value}${expires}; path=/${domain}`;
};

export default setCookie;
