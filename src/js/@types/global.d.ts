import type { OymccType } from '../_types/config';

export declare const window: Window &
  typeof globalThis & {
    oymcc: OymccType | any;
    oymCookieConsentContent: any;
  };
