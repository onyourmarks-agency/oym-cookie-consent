import type { TdeccType } from '../_types/config';

export declare const window: Window &
  typeof globalThis & {
    tdecc: TdeccType | any;
    tdeCookieConsentContent: any;
  };
