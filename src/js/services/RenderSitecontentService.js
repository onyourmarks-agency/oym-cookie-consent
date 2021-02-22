import postscribe from 'postscribe';
import { domQuerySelectorsWebsite } from './DOMService';
import { checkPermission } from './PermissionService';
import notificationTemplate from '../templates/notification';

/**
 * Give an unique ID
 * @returns {string}
 */
const renderUniqueID = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Append the notification after given element
 * @param item
 */
const appendNotification = (item) => {
  if (item.dataset.tdeccIdentifier) {
    return;
  }

  const uniqueID = renderUniqueID();
  const template = notificationTemplate();
  const output = document.createElement('div');
  output.dataset.tdeccIdentifier = uniqueID;
  output.className = 'tdecc-notification';
  output.innerHTML = template;

  // Append HTML
  item.after(output);

  // eslint-disable-next-line no-param-reassign
  item.dataset.tdeccIdentifier = uniqueID;
};

/**
 * Remove notification find by item identifier
 */
const removeNotification = (item) => {
  const key = item.dataset.tdeccIdentifier;

  if (!key) {
    return;
  }

  const notification = document.querySelector(`.tdecc-notification[data-tdecc-identifier="${key}"]`);

  if (!notification) {
    return;
  }

  notification.outerHTML = '';
};

/**
 * Render content on website when permission is given
 * @param config
 */
const renderSiteContent = (config) => {
  domQuerySelectorsWebsite(config).elements.forEach((item) => {
    if (!item.dataset.tdeccPermissions) {
      return;
    }

    // Check permissions
    let permissions = item.dataset.tdeccPermissions;
    permissions = permissions.replace(/\s+/g, '');

    if (!checkPermission(permissions.split(','))) {
      // Render notification
      if (item.hasAttribute('data-tdecc-show-notification')) {
        appendNotification(item);

        // eslint-disable-next-line no-param-reassign
        delete item.dataset.tdeccShowNotification;
      }

      return;
    }

    // Valid? Remove posible notification
    removeNotification(item);

    const output = document.createElement('div');
    const textarea = document.createElement('textarea');
    textarea.innerHTML = item.innerHTML;

    // Append div after given script
    item.after(output);

    // Postscribe. Fill and run JS
    postscribe(output, textarea.value);

    // eslint-disable-next-line no-param-reassign
    item.dataset.tdeccRendered = '1';
  });
};

export default renderSiteContent;
