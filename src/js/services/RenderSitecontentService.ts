// import postscribe from 'postscribe';
import type { ConfigType } from '../_types/config';
import {domElementsSite} from '../config/dom-elements';
import { renderTemplateNotification } from '../templates/notification';
import { getCurrentConfig } from './ConfigService';
import { checkPermission } from './PermissionService';

const renderUniqueID = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const appendNotification = (item: HTMLElement): void => {
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

const removeNotification = (item: HTMLElement): void => {
  const { tdeccIdentifier } = item.dataset;

  if (!tdeccIdentifier) {
    return;
  }

  const notification: HTMLElement | null = document.querySelector(
    `.tdecc-notification[data-tdecc-identifier="${tdeccIdentifier}"]`,
  );

  if (!notification) {
    return;
  }

  notification.outerHTML = '';
};

export const renderSiteContent = (): void => {
  const config: ConfigType = getCurrentConfig();

  domElementsSite(config).forEach((item: HTMLElement): void => {
    let { tdeccPermissions } = item.dataset;
    if (!tdeccPermissions) {
      return;
    }

    tdeccPermissions = tdeccPermissions.replace(/\s+/g, '');

    if (!checkPermission(tdeccPermissions.split(','))) {
      if (item.hasAttribute('data-tdecc-show-notification')) {
        appendNotification(item);
        delete item.dataset.tdeccShowNotification;
      }

      return;
    }

    removeNotification(item);

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.innerHTML = item.innerHTML;

    // postscribe(item.parentElement, textarea.value);

    item.dataset.tdeccRendered = '1';
  });
};

export default renderSiteContent;
