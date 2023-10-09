export type ContentManageType = {
  title: string;
  desc: string;
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
  desc: string;
  button: string;
};

export type ContentSplashType = {
  title: string;
  desc: string;
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
  splash: ContentSplashType;
  manage: ContentManageType;
  permissions: {
    essential: ContentPermissionsType;
  };
  notification: ContentNotificationType;
};
