export const throwError = (message?: string | undefined): void => {
  throw new Error(`TDE Cookieconsent: ${message || 'An error has occurred'}`);
};
