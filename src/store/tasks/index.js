import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state: {
    tasks: [
      {
        taskId: '111',
        groupId: '1',
        title: 'Покушать',
        dateOfAddition: '03.07.2021 - 11:11',
        dateOfEnding: '03.07.2021 - 22:11',
        importance: 7
      },
      {
        taskId: '222',
        groupId: '1',
        title: 'Погладить кота',
        dateOfAddition: '03.07.2021 - 11:22',
        dateOfEnding: '03.07.2021 - 12:21',
        importance: 10
      },
      {
        taskId: '333',
        groupId: '1',
        title: 'Помыть посуду',
        dateOfAddition: '06.07.2021 - 11:33',
        dateOfEnding: '07.07.2021 - 18:33',
        importance: 4
      },
      {
        taskId: '111',
        groupId: '2',
        title: 'Поплавать в бассейне',
        dateOfAddition: '09.07.2021 - 22:33',
        dateOfEnding: '11.07.2021 - 15:15',
        importance: 6
      },
      {
        taskId: '222',
        groupId: '2',
        title: 'Побегать на дорожке',
        dateOfAddition: '11.07.2021 - 14:14',
        dateOfEnding: '14.07.2021 - 17:17',
        importance: 5
      }
    ]
  },
  getters,
  mutations,
  actions
};
