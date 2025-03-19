import type { OymccType } from '../_types/config';

// Extend the Window interface
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
  oymcc: OymccType | any;
  oymCookieConsentContent: any;
}

// Add dataLayer to globalThis
declare global {
  var dataLayer: any[];
  var gtag: (...args: any[]) => void;
  var oymcc: OymccType | any;
  var oymCookieConsentContent: any;
}
