/**
 * Render all options
 * @param options
 * @param content
 * @returns {string}
 */
const options = (options, content) => {
  let template = '';

  for (let i = 0; i < options.length; i +=1) {
    let index = i + 1;

    template += `<div class="tdecc__manage__option">
        <div class="cookie-manage__option__desc">
          <h4>${options[i].title}</h4>
          <p>${options[i].desc}</p>
        </div>
        <div class="tdecc__manage__option__radios">
          <input id="tdecc-option-${index}-on" type="radio" name="cookie-accept-${options[i].key}" value="1">
          <input id="tdecc-option-${index}-off" type="radio" name="cookie-accept-${options[i].key}" value="0">
          
          <div class="tdecc__manage__option__radios__label">
            <label for="tdecc-option-${index}-on">${content.switches.on}</label>
            <label for="tdecc-option-${index}-off">${content.switches.off}</label>
          </div>
        </div>
      </div>`;
  }

  return `<div class="tdecc__manage__options">${template}</div>`;
};

/**
 * Setup the manage-part of the template
 * @param content
 * @param consentOptions
 * @returns {string}
 */
const templateManage = (content, consentOptions) => {
  if (!Object.keys(content)) {
    return '';
  }

  if (!consentOptions.length) {
    return '';
  }

  return `<div class="tdecc__manage">
    <h2 class="tdecc__manage__title">${content.title}</h2>
    <p class="tdecc__manage__desc">${content.title}</p>
    ${options(consentOptions, content)}
    <div class="tdecc__manage__error"></div>
    <div class="tdecc__manage__buttons">
      <button type="button" class="js-save-all-cookies">
        <span>${content.buttons.all}</span>
      </button>
      <button type="button" class="js-save-cookies">
        <span>${content.buttons.save}</span>
      </button>
    </div>
    <div class="tdecc__manage__footer">${content.footer}</div>
  </div>`;
};

export default templateManage;
