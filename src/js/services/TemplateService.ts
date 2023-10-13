import { getCurrentConfig } from './ConfigService';
import { initConsent, removeConsent } from './ConsentService';
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
    /\bshow-tdecc-overlay--popup|show-tdecc-overlay--bar|show-tdecc-overlay--closeable|show-tdecc-overlay\b/g,
    '',
  );

  removeConsent();
};

export const overlayShow = (canBeClosed: boolean | undefined = undefined): void => {
  if (
    canBeClosed ||
    !getCurrentConfig().exceptionUrls.find(
      (item: string): boolean => item === window.location.pathname,
    )
  ) {
    document.body.className += ` show-tdecc-overlay show-tdecc-overlay--${overlayStyle()}`;
  }

  if (canBeClosed) {
    document.body.className += ' show-tdecc-overlay--closeable';
  }

  setPermissions();
  initConsent();
};
