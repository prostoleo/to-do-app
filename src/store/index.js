/* eslint-disable dot-notation */
/* eslint-disable import/no-cycle */
import { createStore } from 'vuex';
import axios from 'axios';

import GroupsModule from './groups/index.js';
import TasksModule from './tasks/index.js';
import AuthModule from './auth/index.js';

export default createStore({
  // strict: true,
  modules: {
    groups: GroupsModule,
    tasks: TasksModule,
    auth: AuthModule
  },
  state: {
    currentGroupId: localStorage.getItem('groupId') ?? null
  },
  getters: {
    groupId(state) {
      return state.currentGroupId;
    }
  },
  mutations: {
    setGroupId(state, data) {
      state.currentGroupId = data.groupId;
    }
  },
  actions: {
    changeGroupId(context, data) {
      context.commit('setGroupId', data);
      localStorage.setItem('groupId', data);
    },
    addToken(context) {
      const { jwt, tokenExpiration } = context.getters['auth/getCurUser'];

      const expiresIn = +tokenExpiration - +Date.now();

      if (jwt && expiresIn > 0) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      } else {
        axios.defaults.headers.common['Authorization'] = null;
      }
    }
  }
});
