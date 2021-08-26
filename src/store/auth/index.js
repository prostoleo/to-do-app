/* eslint-disable import/no-cycle */

import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state: {
    userInfo: {
      login: localStorage.getItem('to-do-app__login') ?? '',
      password: localStorage.getItem('to-do-app__password') ?? '',
      userId: localStorage.getItem('to-do-app_userId') ?? ''
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
