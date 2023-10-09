import type { ConfigType } from './config';

export type TdeccType = {
  accepted: [];
  checkPermission: {};
  config?: ConfigType | undefined;
  content: {};
  getAllPermissions: {};
  hide: {};
  info: {};
  initialized: boolean;
  show: {};
  update: {};
};

declare global {
  interface Window {
    tdecc: TdeccType | any;
    tdeCookieConsentContent: any;
  }
}
