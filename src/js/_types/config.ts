import type {CookieAcceptedType} from './cookie';
import type {ContentType} from './content';

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

export type InfoType = {
  v: string,
  accepted: string;
  updated: string;
}

export type TdeccType = {
  accepted: [];
  checkPermission: (match: string[] | string) => boolean;
  config?: ConfigType | undefined;
  content?: ContentType | undefined;
  getAllPermissions: () => CookieAcceptedType;
  hide: () => void;
  info?: InfoType | undefined;
  initialized: boolean;
  show: () => void;
  update: () => void;
};
