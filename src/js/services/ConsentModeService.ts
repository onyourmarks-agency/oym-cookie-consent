import { ConfigConsentModeType } from '../_types/config';
import { checkPermission } from './PermissionService';

/**
 * Set consent mode values to dataLayer
 * @param consentMode
 * @param state
 * @param refresh
 */
export const setConsentModeValues = (
  consentMode?: ConfigConsentModeType,
  state: 'default' | 'update' = 'update',
  refresh?: number,
) => {
  if (!consentMode) {
    return;
  }

  const consentModeConfig = Object.keys(consentMode);

  if (!consentModeConfig.length) {
    return;
  }

  // Get the current state of the consent mode
  const consentModeValues: { [p: string]: 'denied' | 'granted' | number } = {};

  for (const [key, value] of Object.entries(consentMode)) {
    if (!value) {
      continue;
    }

    consentModeValues[key] = checkPermission(value) ? 'granted' : 'denied';
  }

  // Use gtag if available. Otherwise, push to dataLayer with same format
  globalThis.gtag =
    globalThis.gtag ||
    function (...args: any[]): void {
      globalThis.dataLayer.push(args);
    };

  if (state === 'default') {
    consentModeValues['wait_for_update'] = refresh || 500;
  }

  globalThis.gtag('consent', state, consentModeValues);
};
