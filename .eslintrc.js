module.exports = {
  extends: 'airbnb-base',
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'compat'
  ],
  settings: {
    polyfills: [
      'Promise',
      'Object.assign',
      'Object.values',
      'fetch'
    ]
  },
  rules: {
    'linebreak-style': 0,
    'compat/compat': 2,
    'max-len': ['error', { 'code': 160}],
  }
}
