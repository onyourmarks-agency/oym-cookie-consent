import kickstart from './fns/kickstart';

window.tdecc = window.tdecc || {};
window.tdecc.initialized = false;
window.tdecc.accepted = [];
window.tdecc.info = {};
window.tdecc.content = {};

const consent = () => {
  return {
    getAllPermissions() {

    },

    checkPermission() {
      console.log('The following permissions has givin');
    },

    init(config) {
      if (window.tdecc.initialized) {
        return;
      }

      kickstart(config);
      window.tdecc.initialized = true;
    }
  }
};

export default consent();
