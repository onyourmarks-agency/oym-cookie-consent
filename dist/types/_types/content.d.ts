export type ContentManageType = {
    title: string;
    description: string;
    switches: {
        on: string;
        off: string;
    };
    buttons: {
        all: string;
        save: string;
    };
    error: string;
    footer: string;
};
export type ContentNotificationType = {
    title: string;
    description: string;
    button: string;
};
export type ContentSplashType = {
    title: string;
    description: string;
    buttons: {
        manage: string;
        accept: string;
    };
};
export type ContentPermissionsType = {
    title: string;
    description: string;
};
export type ContentType = {
    index: ContentSplashType;
    manage: ContentManageType;
    permissions: {
        essential: ContentPermissionsType;
    };
    notification: ContentNotificationType;
};
