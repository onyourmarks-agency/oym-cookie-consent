import { domElementsSite } from '../config/dom-elements';
import { checkPermission } from './PermissionService';
import Notification from '../templates/Notification.svelte';
import SiteContent from '../templates/SiteContent.svelte';

const renderUniqueID = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const appendNotification = (item: HTMLElement): void => {
  if (item.dataset.oymccIdentifier) {
    return;
  }

  const uniqueID: string = renderUniqueID();

  const output: HTMLDivElement = document.createElement('div');
  output.dataset.oymccIdentifier = uniqueID;
  output.className = 'oymcc-notification';

  item.after(output);
  item.dataset.oymccIdentifier = uniqueID;

  const elementNotification: HTMLElement | null = document.querySelector(
    `.oymcc-notification[data-oymcc-identifier="${uniqueID}"]`,
  );

  if (!elementNotification) {
    return;
  }

  new Notification({
    target: elementNotification,
  });
};

const removeNotification = (item: HTMLElement): void => {
  const { oymccIdentifier } = item.dataset;

  if (!oymccIdentifier) {
    return;
  }

  const notification: HTMLElement | null = document.querySelector(
    `.oymcc-notification[data-oymcc-identifier="${oymccIdentifier}"]`,
  );

  if (!notification) {
    return;
  }

  notification.outerHTML = '';
};

export const renderSiteContent = (): void => {
  domElementsSite(globalThis.oymcc.config).forEach((item: HTMLElement): void => {
    let { oymccPermissions } = item.dataset;

    if (!oymccPermissions) {
      return;
    }

    oymccPermissions = oymccPermissions.replace(/\s+/g, '');

    if (!checkPermission(oymccPermissions.split(','))) {
      if (item.hasAttribute('data-oymcc-show-notification')) {
        appendNotification(item);
        delete item.dataset.oymccShowNotification;
      }

      return;
    }

    removeNotification(item);

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.innerHTML = item.innerHTML;

    new SiteContent({
      target: item.parentElement as Element,
      props: {
        content: textarea.value,
      },
    });

    item.dataset.oymccRendered = '1';
  });
};

export default renderSiteContent;
