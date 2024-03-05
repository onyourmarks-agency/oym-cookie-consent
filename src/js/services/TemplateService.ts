import { getCurrentConfig } from './ConfigService';
import { renderConsent, removeConsent } from './ConsentService';
import { setPermissions } from './PermissionService';

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
    /\bshow-oymcc-overlay--popup|show-oymcc-overlay--bar|show-oymcc-overlay--closeable|show-oymcc-overlay\b/g,
    '',
  );

  removeConsent();
};

export const overlayShow = (canBeClosed: boolean | undefined = undefined): void => {
  if (document.body.classList.contains('show-oymcc-overlay')) {
    return;
  }

  if (
    canBeClosed ||
    !getCurrentConfig().exceptionUrls.find(
      (item: string): boolean => item === window.location.pathname,
    )
  ) {
    document.body.className += ` show-oymcc-overlay show-oymcc-overlay--${overlayStyle()}`;
  }

  if (canBeClosed) {
    document.body.className += ' show-oymcc-overlay--closeable';
  }

  setPermissions();
  renderConsent();
};
