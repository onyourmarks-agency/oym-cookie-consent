// import postscribe from 'postscribe';
import {domElementsSite} from '../config/dom-elements';
import { checkPermission } from './PermissionService';
import Notification from '../templates/Notification.svelte';

const renderUniqueID = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const appendNotification = (item: HTMLElement): void => {
  if (item.dataset.tdeccIdentifier) {
    return;
  }

  const uniqueID: string = renderUniqueID();

  const output: HTMLDivElement = document.createElement('div');
  output.dataset.tdeccIdentifier = uniqueID;
  output.className = 'tdecc-notification';

  item.after(output);
  item.dataset.tdeccIdentifier = uniqueID;

  const elementNotification: HTMLElement | null = document.querySelector(`.tdecc-notification[data-tdecc-identifier="${uniqueID}"]`);

  if (!elementNotification) {
    return;
  }

  new Notification({
    target: elementNotification,
  });
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
  domElementsSite(globalThis.tdecc.config).forEach((item: HTMLElement): void => {
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
