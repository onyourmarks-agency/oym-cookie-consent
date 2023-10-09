import type { ConfigConsentOptionsType, ConfigType } from '../../_types/config';
import type { ContentManageType } from '../../_types/content';
import { throwError } from '../../services/ErrorService';

const renderTemplateOptions = (
  options: ConfigConsentOptionsType[],
  content: ContentManageType
): string => {
  let template: string = '';

  for (let i: number = 0; i < options.length; i += 1) {
    const index: number = i + 1;

    if (options[i]?.notCustomizable) {
      template += `<div class="tdecc__manage__option">
        <div class="tdecc__manage__option__content">
          <h4 class="tdecc__manage__option__content__title">${options[i].title}</h4>
          <p class="tdecc__manage__option__content__desc">${options[i].desc}</p>
        </div>
        <div class="tdecc__manage__option__radios">
          <input id="tdecc-option-${index}-on" type="radio" name="cookie-accept-${options[i].key}" value="1" checked disabled>
          
          <div class="tdecc__manage__option__radios__labels">
            <label for="tdecc-option-${index}-on">${content.switches.on}</label>
          </div>
        </div>
      </div>`;
    } else {
      template += `<div class="tdecc__manage__option">
        <div class="tdecc__manage__option__content">
          <h4 class="tdecc__manage__option__content__title">${options[i].title}</h4>
          <p class="tdecc__manage__option__content__desc">${options[i].desc}</p>
        </div>
        <div class="tdecc__manage__option__radios">
          <input id="tdecc-option-${index}-on" type="radio" name="cookie-accept-${options[i].key}" value="1">
          <input id="tdecc-option-${index}-off" type="radio" name="cookie-accept-${options[i].key}" value="0">
          
          <div class="tdecc__manage__option__radios__labels">
            <label for="tdecc-option-${index}-on">${content.switches.on}</label>
            <label for="tdecc-option-${index}-off">${content.switches.off}</label>
          </div>
        </div>
      </div>`;
    }
  }

  return `<div class="tdecc__manage__options">${template}</div>`;
};

export const renderTemplateManage = (content: ContentManageType, config: ConfigType): string => {
  if (!config?.manageable) {
    return '';
  }

  if (typeof content !== 'object' || !Object.keys(content)) {
    throwError('Content not found');
    return '';
  }

  if (!config?.consentOptions.length) {
    throwError('No concentoptions are given');
    return '';
  }

  return `<div class="tdecc__manage" data-tdeccoverlay-section-manage>
    <h2 class="tdecc__manage__title">${content.title}</h2>
    <p class="tdecc__manage__desc">${content.desc}</p>
    ${renderTemplateOptions(config.consentOptions, content)}
    <div class="tdecc__manage__error" data-tdeccoverlay-error>${content.error}</div>
    <div class="tdecc__manage__buttons">
      <button type="button" class="tdecc__button" data-tdeccoverlay-save-all>
        <span>${content.buttons.all}</span>
      </button>
      <button type="button" class="tdecc__button tdecc__button--ghost" data-tdeccoverlay-save>
        <span>${content.buttons.save}</span>
      </button>
    </div>
    <div class="tdecc__manage__footer">${content.footer}</div>
  </div>`;
};
