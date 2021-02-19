import throwError from '../fns/throw-error';

/**
 * Return template with notifcation for user
 * @returns {string|void}
 */
const template = () => {
  const { content } = window.tdecc;

  if (!content) {
    return throwError('Content not found');
  }

  return `
    <div class="tdecc__notification">
        <h3 class="tdecc__notification__title">${content.notification.title}</h3>
        <p class="tdecc__notification__desc">${content.notification.desc}</p>
        <button class="tdecc__notification__button" onclick="window.tdecc.show();">
            <span>${content.notification.button}</span>
        </button>
    </div>`;
};

export default template;
