import type { CookieAcceptedType } from '@tdecc/_types/cookie';
import type { DomSelectorsContentType } from '@tdecc/_types/dom';
import templateConsent from '@tdecc/templates/overlay';
import { getCurrentConfig } from './ConfigService';
import { domQuerySelectorsConsent } from './DOMService';
import { getCurrentPermissions } from './PermissionService';

const overlayStyle = (): string => {
  switch (getCurrentConfig().style) {
    case 'popup':
      return 'popup';
    default:
      return 'bar';
  }
};

export const overlayHide = (): void => {
  document.body.className = document.body.className.replace(
    /\bshow-tdecc-overlay--popup|show-tdecc-overlay--bar|show-tdecc-overlay--closeable|show-tdecc-overlay\b/g,
    ''
  );
};

export const overlayShow = (canBeClosed: boolean | undefined = undefined): void => {
  if (
    canBeClosed ||
    !getCurrentConfig().exceptionUrls.find(
      (item: string): boolean => item === window.location.pathname
    )
  ) {
    document.body.className += ` show-tdecc-overlay show-tdecc-overlay--${overlayStyle()}`;
  }

  if (canBeClosed) {
    document.body.className += ' show-tdecc-overlay--closeable';
  }
};

export const renderTemplate = (): void => {
  const popup: HTMLDivElement = document.createElement('div');
  popup.className = 'tdecc';
  popup.innerHTML = templateConsent();

  document.body.appendChild(popup);
};

export const renderGivenPermissions = (): void => {
  const currentPermissions: CookieAcceptedType = getCurrentPermissions();
  const { wrapper } = domQuerySelectorsConsent();

  if (!wrapper) {
    return;
  }

  if (!wrapper || !currentPermissions.length) {
    return;
  }

  const inputs: NodeListOf<HTMLInputElement> = wrapper.querySelectorAll('input[type="radio"]');

  inputs.forEach((input: HTMLInputElement) => {
    if (input.value === '0') {
      input.checked = true;
    }
  });

  for (let i: number = 0; i < currentPermissions.length; i += 1) {
    const selected: NodeListOf<HTMLInputElement> = wrapper.querySelectorAll(
      `input[name="${currentPermissions[i]}"][value="1"]`
    );

    selected.forEach((input: HTMLInputElement) => {
      input.checked = true;
    });
  }
};

export const showManagerSection = (): void => {
  const dom: DomSelectorsContentType = domQuerySelectorsConsent();

  if (!dom.wrapper) {
    return;
  }

  if (!getCurrentConfig().manageable) {
    return;
  }

  if (dom.sectionStart) {
    dom.sectionStart.style.display = 'none';
  }

  if (dom.sectionManage) {
    dom.sectionManage.style.display = 'block';
  }
};
