import type { CookieAcceptedType, CookieType } from '../_types/cookie';
export declare const getCurrentCookie: () => CookieType | null;
export declare const getCurrentPermissions: () => CookieAcceptedType;
export declare const checkPermission: (arr: string[] | string) => boolean;
