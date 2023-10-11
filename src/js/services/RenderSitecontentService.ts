import postscribe from 'postscribe';
import { renderTemplateNotification } from '../templates/notification';
import { getCurrentConfig } from './ConfigService';
import { domQuerySelectorsWebsite } from './DOMService';
import { checkPermission } from './PermissionService';
import type {ConfigType} from '../_types/config';

const renderUniqueID = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const appendNotification = (item): void => {
  if (item.dataset.tdeccIdentifier) {
    return;
  }

  const uniqueID: string = renderUniqueID();
  const template: string | void = renderTemplateNotification();

  if (!template) {
    return;
  }

  const output: HTMLDivElement = document.createElement('div');
  output.dataset.tdeccIdentifier = uniqueID;
  output.className = 'tdecc-notification';
  output.innerHTML = template;

  item.after(output);
  item.dataset.tdeccIdentifier = uniqueID;
};

const removeNotification = (item): void => {
  const key = item.dataset.tdeccIdentifier;

  if (!key) {
    return;
  }

  const notification: HTMLElement = document.querySelector(
    `.tdecc-notification[data-tdecc-identifier="${key}"]`
  );

  if (!notification) {
    return;
  }

  notification.outerHTML = '';
};

export const renderSiteContent = (): void => {
  const config: ConfigType = getCurrentConfig();

  domQuerySelectorsWebsite(config).elements.forEach((item: HTMLElement): void => {
    if (!item.dataset.tdeccPermissions) {
      return;
    }

    let permissions: string = item.dataset.tdeccPermissions;
    permissions = permissions.replace(/\s+/g, '');

    if (!checkPermission(permissions.split(','))) {
      if (item.hasAttribute('data-tdecc-show-notification')) {
        appendNotification(item);
        delete item.dataset.tdeccShowNotification;
      }

      return;
    }

    removeNotification(item);

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.innerHTML = item.innerHTML;

    postscribe(item.parentElement, textarea.value);

    item.dataset.tdeccRendered = '1';
  });
};

export default renderSiteContent;
