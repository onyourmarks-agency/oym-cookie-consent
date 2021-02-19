import templateConsent from '../templates/overlay';
import { domQuerySelectorsConsent } from './DOMService';
import { getCurrentPermissions } from './PermissionService';
import { getCurrentConfig } from './ConfigService';

/**
 * Remove the overlay from the view
 */
const overlayHide = () => {
  // eslint-disable-next-line max-len
  document.body.className = document.body.className.replace(/\bshow-tdecc-overlay--popup|show-tdecc-overlay--bar|show-tdecc-overlay--closeable|show-tdecc-overlay\b/g, '');
};

/**
 * Check overlay style and return always a valid style
 * @returns {string}
 */
const overlayStyle = () => {
  switch (getCurrentConfig().style) {
    case 'popup':
      return 'popup';
    default:
      return 'bar';
  }
};

/**
 * Shows the overlay
 * @param canBeClosed
 */
const overlayShow = (canBeClosed) => {
  if (canBeClosed || getCurrentConfig().exceptionUrls.indexOf(window.location.pathname) === -1) {
    document.body.className += ` show-tdecc-overlay show-tdecc-overlay--${overlayStyle()}`;
  }

  if (canBeClosed) {
    document.body.className += ' show-tdecc-overlay--closeable';
  }
};

/**
 * Render the template
 */
const renderTemplate = () => {
  const popup = document.createElement('div');
  popup.className = 'tdecc';
  popup.innerHTML = templateConsent();

  document.body.appendChild(popup);
};

/**
 * Load earlier given permission and change inputs to given value
 */
const renderGivenPermissions = () => {
  const currentPermissions = getCurrentPermissions();
  const { wrapper } = domQuerySelectorsConsent();

  if (!wrapper) {
    return;
  }

  if (!wrapper || !currentPermissions.length) {
    return;
  }

  const inputs = wrapper.querySelectorAll('input[type="radio"]');

  inputs.forEach((input) => {
    if (input.value === '0') {
      // eslint-disable-next-line no-param-reassign
      input.checked = true;
    }
  });

  for (let i = 0; i < currentPermissions.length; i += 1) {
    const selected = wrapper.querySelectorAll(`input[name="${currentPermissions[i]}"][value="1"]`);

    selected.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.checked = true;
    });
  }
};

/**
 * Show more cookie info...
 */
const showManagerSection = () => {
  const dom = domQuerySelectorsConsent();

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

export {
  overlayHide,
  overlayShow,
  renderTemplate,
  renderGivenPermissions,
  showManagerSection,
};
