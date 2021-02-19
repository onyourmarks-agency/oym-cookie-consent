import throwError from '../../fns/throw-error';

/**
 * Setup start
 * @param content
 * @param config
 * @returns {string|void}
 */
const templateSplash = (content, config) => {
  if (typeof content !== 'object' || !Object.keys(content)) {
    return throwError('Given content is not valid');
  }

  return `<div class="tdecc__start" data-tdeccoverlay-section-start>
    <h2 class="tdecc__start__title">${content?.title}</h2>
    <p class="tdecc__start__desc">${content?.desc}</p>

    <div class="tdecc__start__choices">
      ${config.manageable ? `
        <button type="button" class="tdecc__button tdecc__button--ghost" data-tdeccoverlay-show-manage>
          <span>${content?.buttons?.manage}</span>
        </button>
      ` : ''}

      <button type="button" class="tdecc__button" data-tdeccoverlay-save-all>
        <span>${content?.buttons?.accept}</span>
      </button>
    </div>
  </div>`;
};

export default templateSplash;
