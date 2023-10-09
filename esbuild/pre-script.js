const checkNodeEnvironment = require('./pre-script/check-node-environment');

(async () => {
  checkNodeEnvironment();
  process.exit(0);
})();

