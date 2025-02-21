import type { CookieAcceptedType, CookieType } from '../_types/cookie';
export declare const getCurrentCookie: () => CookieType | null;
export declare const getCurrentPermissions: () => CookieAcceptedType;
export declare const setPermissions: () => void;
export declare const savePermissions: (permissions: any) => void;
export declare const saveAllPermissions: () => void;
export declare const saveNoPermissions: () => void;
export declare const checkPermission: (arr: string[] | string) => boolean;
