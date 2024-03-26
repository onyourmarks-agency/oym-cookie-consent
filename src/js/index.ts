import '../styles/_index.scss';

import type { ConfigType } from './_types/config';
import type { ContentType } from './_types/content';
import type { CookieAcceptedType } from './_types/cookie';
import { OYMCC_SECTION_MANAGE } from './config/sections';
import { activeSection } from './store/active-section';
import { config as configStore } from './store/config';
import { content as contentStore } from './store/content';
import { mergeConfig, mergeContent } from './services/ConfigService';
import { getCookie } from './services/CookieService';
import { throwError } from './services/ErrorService';
import { dispatchChanged } from './services/EventService';
import { checkPermission, getCurrentPermissions } from './services/PermissionService';
import { renderSiteContent } from './services/RenderSitecontentService';
import { handleManageCookieElements } from './services/SiteService';
import { overlayShow, overlayHide } from './services/TemplateService';
import { reset, validate } from './services/ValidationService';
import { setConsentModeValues } from './services/ConsentModeService';

globalThis.oymcc = globalThis.oymcc || {};
globalThis.oymcc.initialized = false;
globalThis.oymcc.accepted = [];
globalThis.oymcc.info = {};
globalThis.oymcc.content = {};

export default {
  getAllPermissions(): CookieAcceptedType {
    return getCurrentPermissions();
  },

  checkPermission(match: string[] | string): boolean {
    return checkPermission(match);
  },

  show(): void {
    activeSection.set(OYMCC_SECTION_MANAGE);
    overlayShow(true);
  },

  hide(): void {
    overlayHide();
  },

  update(): void {
    handleManageCookieElements();
    dispatchChanged();
  },

  init(givenConfig: ConfigType | undefined): void {
    if (globalThis.oymcc.initialized) {
      return;
    }

    const config: ConfigType = mergeConfig(givenConfig);
    const content: ContentType = mergeContent();
    const cookies: string | false = getCookie(config.cookieName) || false;

    globalThis.oymcc.config = config;
    globalThis.oymcc.content = content[config.language];
    globalThis.oymcc.config.consentOptions.unshift({
      key: 'essential',
      title: globalThis.oymcc.content.permissions.essential.title,
      description: globalThis.oymcc.content.permissions.essential.description,
      notCustomizable: true,
    });
    globalThis.oymcc.getAllPermissions = this.getAllPermissions;
    globalThis.oymcc.checkPermission = this.checkPermission;
    globalThis.oymcc.show = this.show;
    globalThis.oymcc.hide = this.hide;
    globalThis.oymcc.update = this.update;

    if (!globalThis.oymcc.content || !globalThis.oymcc.config) {
      throwError('OYMCC content or config not found');
      return;
    }

    if (!globalThis.oymcc.config.consentOptions.length) {
      throwError('OYMCC has no consent options');
      return;
    }

    setConsentModeValues(config.consentMode, 'default', 500);

    configStore.set(globalThis.oymcc.config);
    contentStore.set(globalThis.oymcc.content);

    document.addEventListener('oymcc-changed', (): void => {
      renderSiteContent();
      setConsentModeValues(config.consentMode, 'update');
    });

    document.addEventListener('oymcc-close-overlay', (): void => {
      overlayHide();
    });

    renderSiteContent();

    if (cookies) {
      try {
        validate();
      } catch (e) {
        reset();
        overlayShow();
      }
    } else {
      overlayShow();
    }

    handleManageCookieElements();
    globalThis.oymcc.initialized = true;
  },
};
