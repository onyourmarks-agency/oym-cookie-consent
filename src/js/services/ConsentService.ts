import { TDECC_CLASSNAME } from '../config/defaults';
import { config } from '../store/config';
import { content } from '../store/content';
import Consent from '../templates/Consent.svelte';
import { throwError } from './ErrorService';

export const removeConsent = (): void => {
  const elementConsent: Element | null = document.body.querySelector(`.${TDECC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  elementConsent.remove();
};

export const initConsent = (): void => {
  const divConsent: HTMLDivElement = document.createElement('div');
  divConsent.className = TDECC_CLASSNAME;

  document.body.appendChild(divConsent);

  const elementConsent: Element | null = document.body.querySelector(`.${TDECC_CLASSNAME}`);

  if (!elementConsent) {
    return;
  }

  if (!globalThis.tdecc.content || !globalThis.tdecc.config) {
    throwError('TDECC content or config not found');
    return;
  }

  if (!globalThis.tdecc.config.consentOptions.length) {
    throwError('TDECC has no consent options');
    return;
  }

  config.set(globalThis.tdecc.config);
  content.set(globalThis.tdecc.content);

  new Consent({
    target: elementConsent,
  });
};
