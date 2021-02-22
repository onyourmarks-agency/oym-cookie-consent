import { reset, validate } from './services/ValidationService';
import { handleClickListnersPopup, handleClickListenersContent } from './services/ListenerService';
import { checkPermission, getCurrentPermissions } from './services/PermissionService';
import { mergeConfig, mergeContent } from './services/ConfigService';
import { getCookie } from './services/CookieService';
import { dispatchChanged } from './services/EventService';
import {
  renderTemplate, renderGivenPermissions, overlayShow, overlayHide, showManagerSection,
} from './services/TemplateService';
import renderSiteContent from './services/RenderSitecontentService';

window.tdecc = window.tdecc || {};
window.tdecc.initialized = false;
window.tdecc.accepted = [];
window.tdecc.info = {};
window.tdecc.content = {};

/**
 *
 * @returns {{checkPermission(*=): boolean, init(*=): undefined, initContentClickListeners(): void, getAllPermissions(): (*|null)}}
 */
const consent = () => ({
  /**
   * Get all given permissions
   * @returns {*|null}
   */
  getAllPermissions() {
    return getCurrentPermissions();
  },

  /**
   * Check permission by given value
   * @param match
   * @returns {boolean}
   */
  checkPermission(match) {
    return checkPermission(match);
  },

  /**
   * Force open overlay
   */
  show() {
    overlayShow(true);
    showManagerSection();
  },

  /**
   * Force hiding
   */
  hide() {
    overlayHide();
  },

  /**
   * Things to do on update
   */
  update() {
    handleClickListenersContent();
    dispatchChanged();
  },

  /**
   * Start here
   * @param givenConfig
   */
  init(givenConfig) {
    if (window.tdecc.initialized) {
      return;
    }

    const config = mergeConfig(givenConfig);
    const content = mergeContent();
    const cookies = getCookie(config.cookieName) || false;
    // Make them widely available
    window.tdecc.config = config;
    window.tdecc.content = content[config.language];

    // Add eventlistener for changed cookieprefs
    document.addEventListener('tdecc-changed', () => {
      renderSiteContent(config);
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

    handleClickListnersPopup();
    handleClickListenersContent();

    // Don't run these twice
    window.tdecc.initialized = true;

    // Make functions available
    window.tdecc.getAllPermissions = this.getAllPermissions;
    window.tdecc.checkPermission = this.checkPermission;
    window.tdecc.show = this.show;
    window.tdecc.hide = this.hide;
    window.tdecc.update = this.update;
  },
});

export default consent();
