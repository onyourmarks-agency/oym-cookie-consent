export type ConfigConsentOptionsType = {
  key: string;
  title: string;
  desc: string;
  notCustomizable?: boolean | undefined;
};

export type ConfigExplanationAnchorType = {
  title: string;
  href: string;
};

export type ConfigStyleType = 'bar' | 'popup';

export type ConfigType = {
  consentOptions: ConfigConsentOptionsType[] | [];
  cookieName: string;
  exceptionUrls: string[] | [];
  explanationAnchors: ConfigExplanationAnchorType[] | [];
  language: string;
  manageable: boolean;
  renderSelector: string;
  style: ConfigStyleType;
  version: string;
};

export type TdeccType = {
  accepted: [];
  checkPermission: {};
  config?: ConfigType;
  content: {};
  getAllPermissions: {};
  hide: {};
  info: {};
  initialized: boolean;
  show: {};
  update: {};
};

declare global {
  var tdecc: TdeccType | any;
  var tdeCookieConsentContent: any;
}
