declare module 'tde-cookie-consent/_types/config' {
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
  global {
      var tdecc: TdeccType | any;
      var tdeCookieConsentContent: any;
  }

}
declare module 'tde-cookie-consent/_types/content' {
  export type ContentManageType = {
      title: string;
      desc: string;
      switches: {
          on: string;
          off: string;
      };
      buttons: {
          all: string;
          save: string;
      };
      error: string;
      footer: string;
  };
  export type ContentNotificationType = {
      title: string;
      desc: string;
      button: string;
  };
  export type ContentSplashType = {
      title: string;
      desc: string;
      buttons: {
          manage: string;
          accept: string;
      };
  };
  export type ContentPermissionsType = {
      title: string;
      description: string;
  };
  export type ContentType = {
      splash: ContentSplashType;
      manage: ContentManageType;
      permissions: {
          essential: ContentPermissionsType;
      };
      notification: ContentNotificationType;
  };

}
declare module 'tde-cookie-consent/_types/cookie' {
  export type CookieAcceptedType = string[] | [];
  export type CookieInfoType = {
      v: string;
      accepted: string;
      updated: string;
  } | undefined;
  export type CookieType = {
      accepted: CookieAcceptedType;
      info: CookieInfoType;
  };

}
declare module 'tde-cookie-consent/_types/dom' {
  export type DomSelectorsContentType = {
      wrapper: HTMLElement;
      close: HTMLElement;
      manage: HTMLElement;
      saveAll: NodeListOf<HTMLElement>;
      save: HTMLElement;
      errorMessage: HTMLElement;
      optionsAll: NodeListOf<HTMLElement>;
      optionsChoosen: NodeListOf<HTMLInputElement>;
      sectionStart: HTMLElement;
      sectionManage: HTMLElement;
  };
  export type DomSelectorsWebsiteType = {
      elements: NodeListOf<HTMLElement>;
      manage: NodeListOf<HTMLButtonElement>;
  };

}
declare module 'tde-cookie-consent/config/defaults' {
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  export const TDECC_CLASSNAME: string;
  export const TDECC_CONFIG: ConfigType;

}
declare module 'tde-cookie-consent/index' {
  import '../scss/index.scss';
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  import type { CookieAcceptedType } from 'tde-cookie-consent/_types/cookie';
  const _default: {
      getAllPermissions(): CookieAcceptedType;
      checkPermission(match: string | string[]): boolean;
      show(): void;
      hide(): void;
      update(): void;
      init(givenConfig: ConfigType): void;
  };
  export default _default;

}
declare module 'tde-cookie-consent/services/ConfigService' {
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  export const mergeConfig: (config: ConfigType | undefined) => any;
  export const mergeContent: () => any;
  export const getCurrentConfig: () => ConfigType;

}
declare module 'tde-cookie-consent/services/CookieService' {
  export type SameSiteType = 'Lax' | 'Strict' | 'None' | null;
  export const getCookie: (name: string) => string | null;
  export const setCookie: (name: string, value: string, maxAge?: number, domain?: string, path?: string, sameSite?: SameSiteType) => void;
  export const removeCookie: (name: string, path?: string, domain?: string) => void;

}
declare module 'tde-cookie-consent/services/DOMService' {
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  import type { DomSelectorsContentType, DomSelectorsWebsiteType } from 'tde-cookie-consent/_types/dom';
  export const domQuerySelectorsConsent: () => DomSelectorsContentType;
  export const domQuerySelectorsWebsite: (config?: ConfigType | undefined) => DomSelectorsWebsiteType;

}
declare module 'tde-cookie-consent/services/ErrorService' {
  export const throwError: (message?: string | undefined) => void;

}
declare module 'tde-cookie-consent/services/EventService' {
  import type { CookieAcceptedType, CookieInfoType } from 'tde-cookie-consent/_types/cookie';
  export const dispatchChanged: () => void;
  export const acceptAllOptions: () => void;
  export const storeCookie: (accepted: CookieAcceptedType, info: CookieInfoType) => void;
  export const save: () => void;

}
declare module 'tde-cookie-consent/services/ListenerService' {
  export const handleClickListenersPopup: () => void;
  export const handleClickListenersContent: () => void;

}
declare module 'tde-cookie-consent/services/PermissionService' {
  import type { CookieAcceptedType, CookieType } from 'tde-cookie-consent/_types/cookie';
  export const getCurrentCookie: () => CookieType | null;
  export const getCurrentPermissions: () => CookieAcceptedType;
  export const checkPermission: (arr: string[] | string) => boolean;

}
declare module 'tde-cookie-consent/services/RenderSitecontentService' {
  export const renderSiteContent: () => void;
  export default renderSiteContent;

}
declare module 'tde-cookie-consent/services/TemplateService' {
  export const overlayHide: () => void;
  export const overlayShow: (canBeClosed?: boolean | undefined) => void;
  export const renderConsent: () => void;
  export const renderGivenPermissions: () => void;
  export const showManagerSection: () => void;

}
declare module 'tde-cookie-consent/services/ValidationService' {
  export const reset: () => void;
  export const validate: () => void;

}
declare module 'tde-cookie-consent/templates/icons/arrow' {
  export const renderIconArrow: (width?: number | undefined, height?: number | undefined) => string;

}
declare module 'tde-cookie-consent/templates/icons/close' {
  export const renderIconClose: (width?: number | undefined, height?: number | undefined) => string;

}
declare module 'tde-cookie-consent/templates/notification' {
  export const renderTemplateNotification: () => string;

}
declare module 'tde-cookie-consent/templates/overlay-sections/explanation' {
  import type { ConfigExplanationAnchorType } from 'tde-cookie-consent/_types/config';
  export const renderTemplateExplanation: (anchors: ConfigExplanationAnchorType[]) => string;

}
declare module 'tde-cookie-consent/templates/overlay-sections/manage' {
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  import type { ContentManageType } from 'tde-cookie-consent/_types/content';
  export const renderTemplateManage: (content: ContentManageType, config: ConfigType) => string;

}
declare module 'tde-cookie-consent/templates/overlay-sections/splash' {
  import type { ConfigType } from 'tde-cookie-consent/_types/config';
  import type { ContentSplashType } from 'tde-cookie-consent/_types/content';
  export const renderTemplateSplash: (content: ContentSplashType, config: ConfigType) => string;

}
declare module 'tde-cookie-consent/templates/overlay' {
  const template: () => string;
  export default template;

}
declare module 'tde-cookie-consent/translations/en' {
  import type { ContentType } from 'tde-cookie-consent/_types/content';
  const _default: ContentType;
  export default _default;

}
declare module 'tde-cookie-consent/translations/index' {
  import type { ContentType } from 'tde-cookie-consent/_types/content';
  const translation: {
      nl: ContentType;
      en: ContentType;
  };
  export default translation;

}
declare module 'tde-cookie-consent/translations/nl' {
  import type { ContentType } from 'tde-cookie-consent/_types/content';
  const _default: ContentType;
  export default _default;

}
declare module 'tde-cookie-consent' {
  import main = require('tde-cookie-consent/index');
  export = main;
}