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
  consentOptions?: ConfigConsentOptionsType[] | [] | undefined;
  cookieName?: string | undefined;
  exceptionUrls?: string[] | [] | undefined;
  explanationAnchors?: ConfigExplanationAnchorType[] | [] | undefined;
  language?: string | undefined;
  manageable?: boolean | undefined;
  renderSelector?: string | undefined;
  style?: ConfigStyleType | undefined;
  version?: string | undefined;
};
