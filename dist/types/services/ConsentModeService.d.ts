import { ConfigConsentModeType } from '../_types/config';
/**
 * Set consent mode values to dataLayer
 * @param consentMode
 * @param state
 * @param refresh
 */
export declare const setConsentModeValues: (consentMode?: ConfigConsentModeType, state?: 'default' | 'update', refresh?: number) => void;
