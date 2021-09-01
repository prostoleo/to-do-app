/* eslint-disable import/no-cycle */
import { createStore } from 'vuex';

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
    }
  }
});
