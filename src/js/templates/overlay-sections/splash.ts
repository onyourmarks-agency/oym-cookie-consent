import type { ConfigType } from '@tdecc/_types/config';
import type { ContentSplashType } from '@tdecc/_types/content';
import { throwError } from '@tdecc/services/ErrorService';

export const renderTemplateSplash = (content: ContentSplashType, config: ConfigType): string => {
  if (typeof content !== 'object' || !Object.keys(content)) {
    throwError('Given content is not valid');
    return '';
  }

  return `<div class="tdecc__start" data-tdeccoverlay-section-start>
    <h2 class="tdecc__start__title">${content?.title}</h2>
    <p class="tdecc__start__desc">${content?.desc}</p>

    <div class="tdecc__start__choices">
      ${
        config.manageable
          ? `
        <button type="button" class="tdecc__button tdecc__button--ghost" data-tdeccoverlay-show-manage>
          <span>${content?.buttons?.manage}</span>
        </button>
      `
          : ''
      }

      <button type="button" class="tdecc__button" data-tdeccoverlay-save-all>
        <span>${content?.buttons?.accept}</span>
      </button>
    </div>
  </div>`;
};
