import type { ConfigType } from '../_types/config';
import type { DomSelectorsContentType, DomSelectorsWebsiteType } from '../_types/dom';
export declare const domQuerySelectorsConsent: () => DomSelectorsContentType;
export declare const domQuerySelectorsWebsite: (config?: ConfigType | undefined) => DomSelectorsWebsiteType;
