import type { ConfigType } from '@js/_types/config';
import configDefaults from '@js/config/defaults';
import contentDefaults from '@js/translations';

function mergeDeep(
  target: Record<string, any>,
  ...sources: Record<string, any>[]
): Record<string, any> {
  if (target === null || typeof target !== 'object') {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  sources.forEach((source): void => {
    if (source === null || typeof source === 'object') {
      return;
    }

    Object.keys(source).forEach((nextKey): void => {
      if (
        typeof target[nextKey] === 'object' &&
        target[nextKey] !== null &&
        typeof source[nextKey] === 'object' &&
        source[nextKey] !== null
      ) {
        target[nextKey] = mergeDeep(target[nextKey], source[nextKey]);
      } else {
        target[nextKey] = source[nextKey];
      }
    });
  });

  return target;
}

export const mergeConfig = (config: ConfigType | undefined) => {
  const configGiven: ConfigType | undefined =
    typeof config === 'object' && Object.keys(config).length ? config : {};

  return mergeDeep({}, configDefaults, configGiven);
};

export const mergeContent = () => {
  const content = window.tdeCookieConsentContent;
  const contentGiven = typeof content === 'object' && Object.keys(content).length ? content : {};

  return mergeDeep({}, contentDefaults, contentGiven);
};

export const getCurrentConfig = (): ConfigType => {
  try {
    JSON.parse(JSON.stringify(window.tdecc.config));
    return window.tdecc.config;
  } catch (e) {
    return configDefaults;
  }
};
