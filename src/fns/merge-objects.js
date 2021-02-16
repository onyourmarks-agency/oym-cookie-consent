import configDefaults from '../config/defaults';
import contentDefaults from '../translations/content';

Object.assignDeep = function (target, varArgs) {
  'use strict';
  if (target === null) { // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  let to = Object(target);

  for (let index = 1; index < arguments.length; index += 1) {
    const nextSource = arguments[index];

    // Skip over if undefined or null
    if (nextSource !== null) {
      for (let nextKey in nextSource) {

        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          if (
            typeof to[nextKey] === 'object'
            && to[nextKey]
            && typeof nextSource[nextKey] === 'object'
            && nextSource[nextKey])
          {
            Object.assignDeep(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }

  return to;
};

/**
 * Merge the config given on init and the base config file
 * @param config
 * @returns {any}
 */
const mergeConfig = (config) => {
  const configGiven = (typeof config === 'object' && Object.keys(config).length) ? config : {};

  return Object.assignDeep({}, configDefaults, configGiven);
};

/**
 * Merge the content given in JS and the default content
 * @returns {any}
 */
const mergeContent = () => {
  const content = window.tdeCookieConsentContent;
  const contentGiven = (typeof content === 'object' && Object.keys(content).length) ? content : {};
  
  return Object.assignDeep({}, contentDefaults, contentGiven);
};

export {
  mergeConfig,
  mergeContent,
};
