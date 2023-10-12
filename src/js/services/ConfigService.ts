import type { ConfigType } from '../_types/config';
import { TDECC_CONFIG as configDefaults } from '../config/defaults';
import contentDefaults from '../translations/index';

function mergeDeep(target: any, ...sources: any[]): any {
  if (target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to: any = Object(target);

  for (let index: number = 0; index < sources.length; index += 1) {
    const nextSource: any = sources[index];

    if (nextSource !== null && typeof nextSource === 'object') {
      Object.keys(nextSource).forEach((nextKey) => {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          if (
            typeof to[nextKey] === 'object' &&
            to[nextKey] &&
            typeof nextSource[nextKey] === 'object' &&
            nextSource[nextKey]
          ) {
            to[nextKey] = mergeDeep(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      });
    }
  }

  return to;
}

export const mergeConfig = (config: ConfigType | undefined = undefined): ConfigType => {
  if (!Object.keys(config || []).length) {
    return configDefaults;
  }

  return mergeDeep({}, configDefaults, config);
};

export const mergeContent = () => {
  const content = globalThis.tdeCookieConsentContent;
  const contentGiven = typeof content === 'object' && Object.keys(content).length ? content : {};

  return mergeDeep({}, contentDefaults, contentGiven);
};

export const getCurrentConfig = (): ConfigType => {
  try {
    JSON.parse(JSON.stringify(globalThis.tdecc.config));
    return globalThis.tdecc.config;
  } catch (e) {
    return configDefaults;
  }
};
