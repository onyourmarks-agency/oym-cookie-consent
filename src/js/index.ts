import '../styles/index.scss';

import type { ConfigType } from './_types/config';
import type { ContentType } from './_types/content';
import type { CookieAcceptedType } from './_types/cookie';
import { mergeConfig, mergeContent } from './services/ConfigService';
import {getCookie} from './services/CookieService';
import { dispatchChanged } from './services/EventService';
import { checkPermission, getCurrentPermissions } from './services/PermissionService';
import { renderSiteContent } from './services/RenderSitecontentService';
import {handleManageCookieElements} from './services/SiteService';
import { overlayShow, overlayHide } from './services/TemplateService';
import { reset, validate } from './services/ValidationService';
import { activeSection } from './store/active-section';
import { TDECC_SECTION_MANAGE } from './config/sections';

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

    document.addEventListener('tdecc-changed', (): void => {
      renderSiteContent();
    });

    document.addEventListener('tdecc-close-overlay', (): void => {
      overlayHide();
    });

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
