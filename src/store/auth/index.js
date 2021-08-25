import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state: {
    userInfo: {
      login: '',
      password: '',
      id: ''
    },

    users: [
      {
        login: 'John',
        password: '1234567',
        id: '1234'
      }
    ]
  },
  getters,
  mutations,
  actions
};
