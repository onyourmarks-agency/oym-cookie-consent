import configDefaults from '../config/defaults';
import contentDefaults from '../translations';

/**
 * Merge two objects deep
 * @param target
 * @returns {any}
 */
function mergeDeep(target) {
  if (target === null) { // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index += 1) {
    // eslint-disable-next-line prefer-rest-params
    const nextSource = arguments[index];

    // Skip over if undefined or null
    if (nextSource !== null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          if (typeof to[nextKey] === 'object' && to[nextKey] && typeof nextSource[nextKey] === 'object' && nextSource[nextKey]) {
            mergeDeep(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }

  return to;
}

/**
 * Merge the config given on init and the base config file
 * @param config
 * @returns {any}
 */
const mergeConfig = (config) => {
  const configGiven = (typeof config === 'object' && Object.keys(config).length) ? config : {};

  return mergeDeep({}, configDefaults, configGiven);
};

/**
 * Merge the content given in JS and the default content
 * @returns {any}
 */
const mergeContent = () => {
  const content = window.tdeCookieConsentContent;
  const contentGiven = (typeof content === 'object' && Object.keys(content).length) ? content : {};

  return mergeDeep({}, contentDefaults, contentGiven);
};

/**
 * Get the current config stored in window.tdecc.config or defaults if not valid
 * @returns config
 */
const getCurrentConfig = () => {
  try {
    JSON.parse(JSON.stringify(window.tdecc.config));
    return window.tdecc.config;
  } catch (e) {
    return configDefaults;
  }
};

export {
  mergeConfig,
  mergeContent,
  getCurrentConfig,
};
