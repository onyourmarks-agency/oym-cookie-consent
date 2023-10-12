import '../styles/index.scss';
import type { ConfigType } from './_types/config';
import type { CookieAcceptedType } from './_types/cookie';
declare const _default: {
    getAllPermissions(): CookieAcceptedType;
    checkPermission(match: string[] | string): boolean;
    show(): void;
    hide(): void;
    update(): void;
    init(givenConfig: ConfigType | undefined): void;
};
export default _default;
