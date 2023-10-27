import { get } from 'svelte/store';
import type { ConfigConsentOptionsType } from '../_types/config';
import type { CookieAcceptedType, CookieInfoType, CookieType } from '../_types/cookie';
import { acceptedPermissions } from '../store/accepted-permissions';
import { chosenPermissions } from '../store/chosen-permissions';
import { config } from '../store/config';
import { getCurrentConfig } from './ConfigService';
import { getCookie } from './CookieService';
import { dispatchChanged, dispatchCloseOverlay, storeCookie } from './EventService';

export const getCurrentCookie = (): CookieType | null => {
  const cookie: string | false = getCookie(getCurrentConfig().cookieName) || false;
  return cookie ? (JSON.parse(cookie) as CookieType) : null;
};

export const getCurrentPermissions = () => {
  const cookie: CookieType | null = getCurrentCookie();
  return cookie?.accepted || [];
};

export const setPermissions = (): void => {
  const currentPermissions: CookieAcceptedType = getCurrentPermissions();
  if (currentPermissions.length) {
    acceptedPermissions.set(currentPermissions);
    chosenPermissions.set(getCurrentConfig().consentOptions.map((option) => option.key));
    return;
  }

  acceptedPermissions.set(['essential']);
  chosenPermissions.set(['essential']);
};

export const savePermissions = (permissions): void => {
  storeCookie(permissions, {
    v: getCurrentConfig().version,
    accepted: getCurrentCookie()?.info?.accepted || new Date().toISOString(),
    updated: new Date().toISOString(),
  } as CookieInfoType);
  dispatchChanged();
  dispatchCloseOverlay();
};

export const saveAllPermissions = (): void => {
  const options: ConfigConsentOptionsType[] = get(config)?.consentOptions || [];
  savePermissions(options.map((consentOption) => consentOption.key));
};

export const checkPermission = (arr: string[] | string): boolean => {
  if (!arr || !arr.length) {
    return false;
  }

  const prefs: CookieAcceptedType | null = getCurrentPermissions();

  if (!prefs) {
    return false;
  }

  const items: string[] = typeof arr === 'string' ? [arr] : arr;

  for (let i: number = 0; i < items.length; i += 1) {
    if (!prefs.find((pref: string): boolean => pref === items[i])) {
      return false;
    }
  }

  return true;
};
