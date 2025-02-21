type SameSiteType = 'Strict' | 'Lax' | 'None';
export declare const setCookie: (name: string, value: string, maxAge?: number, domain?: string, path?: string, sameSite?: SameSiteType) => void;
export declare const removeCookie: (name: string, path?: string, domain?: string) => void;
export declare const getCookie: (name: string) => string | null;
export {};
