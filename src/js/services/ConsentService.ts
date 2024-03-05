import { OYMCC_CLASSNAME } from '../config/defaults';
import Consent from '../templates/Consent.svelte';

export const removeConsent = (): void => {
  const elementConsent: Element | null = document.body.querySelector(`.${OYMCC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  elementConsent.remove();
};

export const renderConsent = (): void => {
  const divConsent: HTMLDivElement = document.createElement('div');
  divConsent.className = OYMCC_CLASSNAME;

  document.body.appendChild(divConsent);

  const elementConsent: Element | null = document.body.querySelector(`.${OYMCC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  new Consent({
    target: elementConsent,
  });
};
