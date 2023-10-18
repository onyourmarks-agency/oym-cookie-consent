import '../styles/index.scss';

import type { ConfigType } from './_types/config';
import type { ContentType } from './_types/content';
import type { CookieAcceptedType } from './_types/cookie';
import { TDECC_SECTION_MANAGE } from './config/sections';
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

globalThis.tdecc = globalThis.tdecc || {};
globalThis.tdecc.initialized = false;
globalThis.tdecc.accepted = [];
globalThis.tdecc.info = {};
globalThis.tdecc.content = {};

export default {
  getAllPermissions(): CookieAcceptedType {
    return getCurrentPermissions();
  },

  checkPermission(match: string[] | string): boolean {
    return checkPermission(match);
  },

  show(): void {
    activeSection.set(TDECC_SECTION_MANAGE);
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
    if (globalThis.tdecc.initialized) {
      return;
    }

    const config: ConfigType = mergeConfig(givenConfig);
    const content: ContentType = mergeContent();
    const cookies: string | false = getCookie(config.cookieName) || false;

    globalThis.tdecc.config = config;
    globalThis.tdecc.content = content[config.language];
    globalThis.tdecc.config.consentOptions.unshift({
      key: 'essential',
      title: globalThis.tdecc.content.permissions.essential.title,
      description: globalThis.tdecc.content.permissions.essential.description,
      notCustomizable: true,
    });
    globalThis.tdecc.getAllPermissions = this.getAllPermissions;
    globalThis.tdecc.checkPermission = this.checkPermission;
    globalThis.tdecc.show = this.show;
    globalThis.tdecc.hide = this.hide;
    globalThis.tdecc.update = this.update;

    if (!globalThis.tdecc.content || !globalThis.tdecc.config) {
      throwError('TDECC content or config not found');
      return;
    }

    if (!globalThis.tdecc.config.consentOptions.length) {
      throwError('TDECC has no consent options');
      return;
    }

    configStore.set(globalThis.tdecc.config);
    contentStore.set(globalThis.tdecc.content);

    document.addEventListener('tdecc-changed', (): void => {
      renderSiteContent();
    });

    document.addEventListener('tdecc-close-overlay', (): void => {
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

    globalThis.tdecc.initialized = true;
  },
};
