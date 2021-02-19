/**
 * Throw an error if some information are missing
 * @param message
 */
const throwError = (message) => {
  throw new Error(`TDE Cookieconsent: ${message || 'An error has occurred'}`);
};

export default throwError;
