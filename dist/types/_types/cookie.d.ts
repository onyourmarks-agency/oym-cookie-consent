export type CookieAcceptedType = string[] | [];
export type CookieInfoType = {
    v: string;
    accepted: string;
    updated: string;
} | undefined;
export type CookieType = {
    accepted: CookieAcceptedType;
    info: CookieInfoType;
};
