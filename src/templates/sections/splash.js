const templateSplash = (content) => {
  if (!Object.keys(content)) {
    return '';
  }

  return `<div class="tdecc__start">
    <h2 class="tdecc__start__title">${content.title}</h2>
    <p class="tdecc__start__desc">${content.desc}</p>

    <div class="tdecc__start__choices">
      <button type="button" class="js-show-more">
        <span>${content.buttons.manage}</span>
      </button>

      <button type="button" class="js-save-all-cookies">
        <span>${content.buttons.accept}</span>
      </button>
    </div>
  </div>`;
};

export default templateSplash;
