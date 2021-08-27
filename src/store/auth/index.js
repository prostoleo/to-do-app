/* eslint-disable import/no-cycle */

import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state: {
    userInfo: {
      username: localStorage.getItem('username') ?? '',
      jwt: localStorage.getItem('jwt') ?? '',
      userId: localStorage.getItem('userId') ?? '',
      tokenExpiration: localStorage.getItem('tokenExpiration') ?? ''
    },
    // JSON.parse(localStorage.getItem('to-do-app__users')) ??
    users: [
      {
        login: 'John',
        password: '1234567',
        id: '1234'
      },
      {
        login: 'Jessica',
        password: '0000000',
        id: '4321'
      }
    ]
  },
  getters,
  mutations,
  actions
};
