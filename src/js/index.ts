import '../scss/index.scss';

import type { ConfigType } from './_types/config';
import type { CookieAcceptedType } from './_types/cookie';
import { mergeConfig, mergeContent } from './services/ConfigService';
import { getCookie } from './services/CookieService';
import { dispatchChanged } from './services/EventService';
import { handleClickListenersPopup, handleClickListenersContent } from './services/ListenerService';
import { checkPermission, getCurrentPermissions } from './services/PermissionService';
import { renderSiteContent } from './services/RenderSitecontentService';
import {
  renderTemplate,
  renderGivenPermissions,
  overlayShow,
  overlayHide,
  showManagerSection,
} from './services/TemplateService';
import { reset, validate } from './services/ValidationService';

window.tdecc = window.tdecc || {};
window.tdecc.initialized = false;
window.tdecc.accepted = [];
window.tdecc.info = {};
window.tdecc.content = {};

const consent = () => ({
  getAllPermissions(): CookieAcceptedType {
    return getCurrentPermissions();
  },

  checkPermission(match): boolean {
    return checkPermission(match);
  },

  show(): void {
    overlayShow(true);
    showManagerSection();
  },

  hide(): void {
    overlayHide();
  },

  update(): void {
    handleClickListenersContent();
    dispatchChanged();
  },

  init(givenConfig: ConfigType | undefined): void {
    if (window.tdecc.initialized) {
      return;
    }

    const config = mergeConfig(givenConfig);
    const content = mergeContent();
    const cookies: string | false = getCookie(config.cookieName) || false;
    // Make them widely available
    window.tdecc.config = config;
    window.tdecc.content = content[config.language];

    // Make functions available
    window.tdecc.getAllPermissions = this.getAllPermissions;
    window.tdecc.checkPermission = this.checkPermission;
    window.tdecc.show = this.show;
    window.tdecc.hide = this.hide;
    window.tdecc.update = this.update;

    // Add eventlistener for changed cookieprefs
    document.addEventListener('tdecc-changed', (): void => {
      renderSiteContent();
    });

    // Render template
    renderTemplate();

    if (cookies) {
      try {
        validate();
        renderGivenPermissions();
      } catch (e) {
        reset();
        overlayShow();
      }
    } else {
      overlayShow();
    }

    handleClickListenersPopup();
    handleClickListenersContent();

    // Don't run these twice
    window.tdecc.initialized = true;
  },
});

export default consent();
