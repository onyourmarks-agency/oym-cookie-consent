import type { ConfigType } from '@tdecc/_types/config';

const { content } = window.tdecc;

export default {
  consentOptions: [
    {
      key: 'essential',
      title: content.permissions.essential.title,
      desc: content.permissions.essential.description,
      notCustomizable: true,
    },
  ],
  cookieName: 'tdecc',
  exceptionUrls: [],
  explanationAnchors: [],
  language: 'nl',
  manageable: true,
  style: 'bar',
  renderSelector: '[data-tdecc-render]',
  version: '1.0',
} as ConfigType;
