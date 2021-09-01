import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  // JSON.parse(localStorage.getItem('to-do-app__groups'))
  // [JSON.parse(localStorage.getItem('to-do-app__groups'))] ??
  state: {
    groups: []
    /* [
      {
        groupId: '1',
        title: 'Дом',
        // dateOfAddition: '03.07.2021 - 11:11',
        dateOfAddition: '2021-07-03T08:11:00.965Z',
        avgImportance: 7,
        userId: '1234'
      },
      {
        groupId: '2',
        title: 'Тренировка',
        // dateOfAddition: '04.07.2021 - 22:22',
        dateOfAddition: '2021-07-04T19:22:00.965Z',
        avgImportance: 5.5,
        userId: '1234'
      }
    ] */
  },
  getters,
  mutations,
  actions
};
