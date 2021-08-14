import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state: {
    groups: [
      {
        groupId: '1',
        title: 'Дом',
        // dateOfAddition: '03.07.2021 - 11:11',
        dateOfAddition: '2021-07-03T08:11:00.965Z',
        avgImportance: 6.8
      },
      {
        groupId: '2',
        title: 'Тренировка',
        // dateOfAddition: '04.07.2021 - 22:22',
        dateOfAddition: '2021-07-04T19:22:00.965Z',
        avgImportance: 6.2
      }
    ]
  },
  getters,
  mutations,
  actions
};
