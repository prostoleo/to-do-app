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
        // dateOfAddition: '03.07.2021 - 11:11',
        dateOfAddition: '2021-07-03T08:11:00.965Z',
        // dateOfEnding: '03.07.2021 - 22:11',
        dateOfEnding: '2021-07-03T19:11:00.965Z',
        importance: 7
      },
      {
        taskId: '222',
        groupId: '1',
        title: 'Погладить кота',
        // dateOfAddition: '03.07.2021 - 11:22',
        dateOfAddition: '2021-07-03T08:22:00.965Z',
        // dateOfEnding: '03.07.2021 - 12:21',
        dateOfEnding: '2021-07-03T09:21:00.965Z',
        importance: 10
      },
      {
        taskId: '333',
        groupId: '1',
        title: 'Помыть посуду',
        // dateOfAddition: '06.07.2021 - 11:33',
        dateOfAddition: '2021-07-06T08:33:00.965Z',
        // dateOfEnding: '07.07.2021 - 18:33',
        dateOfEnding: '2021-07-06T15:33:00.965Z',
        importance: 4
      },
      {
        taskId: '1111',
        groupId: '2',
        title: 'Поплавать в бассейне',
        // dateOfAddition: '09.07.2021 - 22:33',
        dateOfAddition: '2021-07-09T19:33:00.965Z',
        // dateOfEnding: '11.07.2021 - 15:15',
        dateOfEnding: '2021-07-11T12:15:00.965Z',
        importance: 6
      },
      {
        taskId: '2222',
        groupId: '2',
        title: 'Побегать на дорожке',
        // dateOfAddition: '11.07.2021 - 14:14',
        dateOfAddition: '2021-07-11T11:14:00.965Z',
        // dateOfEnding: '14.07.2021 - 17:17',
        dateOfEnding: '2021-07-14T14:17:00.965Z',
        importance: 5
      }
    ]
  },
  getters,
  mutations,
  actions
};
