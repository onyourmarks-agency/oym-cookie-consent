import getCookie from './cookies/get-cookie';
import { mergeConfig, mergeContent } from './merge-objects';
import renderTemplate from './render-template';
import validate from './validate';
import reset from './reset';
// import show from './templates/show';

const kickstart = (givenConfig) => {
  const config = mergeConfig(givenConfig);
  const content = mergeContent();
  const current = getCookie(config.cookieName) || false;

  // Make them widely available
  window.tdecc.config = config;
  window.tdecc.content = content[config.language];

  if (current) {
    try {
      JSON.parse(current);

      console.log(JSON.parse(current));
      // validate();
    } catch (e) {
      console.log('catch');
      // reset();
      // show();
      // triggerOptions(givenPreferences);
    }
  } else {
    // show();
    // triggerOptions(givenPreferences);

    renderTemplate();

    console.log('Trigger options');
  }
};

export default kickstart;
