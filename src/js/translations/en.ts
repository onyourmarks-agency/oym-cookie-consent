import type { ContentType } from '../_types/content';

export default {
  index: {
    title: 'May we have your attention?',
    description: 'We place cookies to provide a personalized experience and improve our website.',
    buttons: {
      manage: 'Manage cookies',
      accept: 'I accept cookies',
    },
  },
  manage: {
    title: 'Cookie settings',
    description: `We are happy to show you a good website, tailored to your preferences.
         Do you want this too? Then set the items below to 'On'.
         By doing this, you give us permission to provide you with a personalized experience through the use of cookies and other techniques.`,
    switches: {
      on: 'On',
      off: 'Off',
    },
    buttons: {
      all: 'Accept all',
      save: 'Save choice',
    },
    error: 'You have not answered all questions yet. Please indicate your preference above.',
    footer: 'Your choice can always be changed in our cookie settings.',
  },
  permissions: {
    essential: {
      title: 'Essential',
      description:
        'Essential cookies are necessary for basic functions such as authentication and remembering preferences, ensuring a smooth online experience.',
    },
  },
  notification: {
    title: 'Accept (more) cookies to view this content',
    description: `This content is not visible because an external data is loaded with which cookies can be placed.
          You have not yet given us permission to place these cookies.`,
    button: 'Change cookie preferences',
  },
} as ContentType;
