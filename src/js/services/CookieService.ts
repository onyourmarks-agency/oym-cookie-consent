type SameSiteType = 'Strict' | 'Lax' | 'None';

interface CookieProperties {
  [key: string]: string | number | null;
}

export const setCookie = (
  name: string,
  value: string,
  maxAge?: number,
  domain?: string,
  path?: string,
  sameSite?: SameSiteType,
): void => {
  const cookieProperties: CookieProperties = {
    [name]: value,
    'Max-Age': maxAge || null,
    Path: path || '/',
    Domain: domain || null,
    Secure: '',
    SameSite: sameSite || 'Lax',
  };

  document.cookie = Object.entries(cookieProperties)
    .map(([key, value]) => {
      if (value === null) return '';
      if (key === 'Secure') return 'Secure';
      return `${key}=${value}`;
    })
    .filter(Boolean)
    .join('; ');
};

export const removeCookie = (name: string, path?: string, domain?: string): void => {
  const cookieProperties: CookieProperties = {
    [name]: '',
    Path: path || '/',
    Domain: domain || null,
    expires: new Date(0).toUTCString(),
    SameSite: 'Lax',
  };

  document.cookie = Object.entries(cookieProperties)
    .map(([key, value]) => {
      if (value === null) return '';
      return `${key}=${value}`;
    })
    .filter(Boolean)
    .join('; ');
};

export const getCookie = (name: string): string | null => {
  const escapedCookieName: string = name.replace(/([.*+?^$(){}|[\]/\\])/g, '\\$1');
  const matchedCookie: RegExpMatchArray | null = document.cookie.match(
    RegExp(`(?:^|;\\s*)${escapedCookieName}=([^;]*)`),
  );

  return matchedCookie && matchedCookie[1] ? matchedCookie[1] : null;
};
