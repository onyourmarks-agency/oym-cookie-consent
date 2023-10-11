const path = require('path');

const BASE_PATH = path.resolve(__dirname, '../..');

const DEFAULT_CONFIG = {
  /**
   * Debug mode (true|false). Should be disabled on production builds
   */
  debug: true,

  /**
   * Private build folder
   */
  private: `${BASE_PATH}/lib/`,

  /**
   * Source map variant
   */
  sourceMap: 'eval-cheap-module-source-map',

  /**
   * The base entry files that have to go through the loader
   */
  entries: {
    'index': `${BASE_PATH}/src/js/index.ts`,
  },

  /**
   * Registered and enabled plugins, executed IN order
   */
  enabledPlugins: [
    'cleaner',
    'css',
    'js',
  ],

  /**
   * Components
   */
  components: {
    /**
     * Cleaner: Clean build folder prior to a new build
     */
    cleaner: {
      pattern: ['**/*'],
    },

    /**
     * Javascript (ES6)
     */
    js: {
      source: `${BASE_PATH}/assets/js/`,
      dist: `${BASE_PATH}/lib`,
      fileMask: '[name].js',
    },

    /**
     * CSS with SCSS
     */
    css: {
      source: `${BASE_PATH}/assets/scss/`,
      dist: `${BASE_PATH}/lib/`,
      fileMask: '[name].css',
    },
  },
};

module.exports = DEFAULT_CONFIG;
