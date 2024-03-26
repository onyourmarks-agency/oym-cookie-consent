import { OYMCC_CLASSNAME } from '../config/defaults';
import Consent from '../templates/Consent.svelte';

let lastFocus: HTMLElement | null;

export const removeConsent = (): void => {
  const elementConsent: Element | null = document.body.querySelector(`.${OYMCC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  elementConsent.remove();

  if (lastFocus) {
    lastFocus.focus();
  }
};

export const renderConsent = (): void => {
  lastFocus = document.activeElement as HTMLElement;

  const divConsent: HTMLDivElement = document.createElement('div');
  divConsent.className = OYMCC_CLASSNAME;

  document.body.appendChild(divConsent);

  const elementConsent: HTMLElement | null = document.body.querySelector(`.${OYMCC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  new Consent({
    target: elementConsent,
  });
};
