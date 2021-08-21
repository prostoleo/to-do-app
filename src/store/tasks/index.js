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
        description:
          'Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание направлений прогрессивного развития. Повседневная практика показывает, что сложившаяся структура организации позволяет выполнять важные задания по разработке модели развития.',
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
        description:
          'С другой стороны новая модель организационной деятельности позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание существенных финансовых и административных условий. ',
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
        description:
          'А также стремящиеся вытеснить традиционное производство, нанотехнологии обнародованы. Акционеры крупнейших компаний функционально разнесены на независимые элементы. В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей, инициированные исключительно синтетически, преданы социально-демократической анафеме.',
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
        description:
          'Ясность нашей позиции очевидна: начало повседневной работы по формированию позиции предполагает независимые способы реализации глубокомысленных рассуждений.',
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
        description:
          'Семантический разбор внешних противодействий однозначно определяет каждого участника как способного принимать собственные решения касаемо модели развития. Являясь всего лишь частью общей картины, действия представителей оппозиции и по сей день остаются уделом либералов, которые жаждут быть подвергнуты целой серии независимых исследований.',
        importance: 5
      }
    ]
  },
  getters,
  mutations,
  actions
};
