import type { CookieAcceptedType } from './cookie';
import type { ContentType } from './content';

export type ConfigConsentOptionsType = {
  key: string;
  title: string;
  description: string;
  notCustomizable?: boolean | undefined;
};

export type ConfigExplanationAnchorType = {
  title: string;
  href: string;
};

export type ConfigConsentModeType = {
  ad_personalization?: string;
  ad_storage?: string;
  ad_user_data?: string;
  analytics_storage?: string;
  functionality_storage?: string;
  personalization_storage?: string;
  security_storage?: string;
  [key: string]: string | undefined;
};

export type ConfigStyleType = 'bar' | 'popup';

export type ConfigType = {
  consentOptions: ConfigConsentOptionsType[] | [];
  cookieName: string;
  exceptionUrls: string[] | [];
  explanationAnchors: ConfigExplanationAnchorType[] | [];
  language: string;
  manageable: boolean;
  denyable: boolean;
  renderSelector: string;
  style: ConfigStyleType;
  version: string;
  consentMode?: ConfigConsentModeType;
};

export type InfoType = {
  v: string;
  accepted: string;
  updated: string;
};

export type OymccType = {
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
