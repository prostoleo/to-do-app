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
        dateOfAddition: '03.07.2021 - 11:11',
        avgImportance: 6.8
      },
      {
        groupId: '2',
        title: 'Тренировка',
        dateOfAddition: '04.07.2021 - 22:22',
        avgImportance: 6.2
      }
    ]
  },
  getters,
  mutations,
  actions
};
