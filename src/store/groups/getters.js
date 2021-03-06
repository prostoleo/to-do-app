import selectOnQuery from '../../helpers/groups/selectOnQuery';
import selectOnFilterInfo from '../../helpers/groups/selectOnFilterInfo';

export default {
  groups(state) {
    return state.groups;
  },

  getGroupsOfCurUser(_, getters, _3, rootGetters) {
    console.log('getters: ', getters);
    console.log('rootGetters: ', rootGetters);
    const groups = JSON.parse(localStorage.getItem('to-do-app__groups'));

    const { userId } = rootGetters['auth/getCurUser'];

    const returnedValue = groups?.filter((g) => g.userId === userId);

    return returnedValue.length > 0 ? returnedValue : null;
  },

  groupOnId: (state) => (id) => state.groups.find((g) => g.groupId === id),

  // eslint-disable-next-line consistent-return
  selectedGroups: (state) => (data) => {
    let selectedGroups = null;

    //* поисковый запрос
    const query = data?.query ?? null;
    console.log('query: ', query);

    //* для фильтров
    const filterInfo = data?.filterInfo ?? null;
    console.log('filterInfo: ', filterInfo);

    //* получаем свойства в отдельные параметры, при этом указываем значение по умолчанию
    const dateAdditionFrom = filterInfo?.dateAdditionFrom ?? null;
    const dateAdditionTo = filterInfo?.dateAdditionTo ?? null;
    const impFrom = filterInfo?.impFrom ?? null;
    const impTo = filterInfo?.impTo ?? null;

    //* проверяем есть ли хоть truthy значение в объекте
    const hasFilterTruthyValue = filterInfo ? Object.values(filterInfo).some((v) => !!v) : null;

    console.log('hasFilterTruthyValue: ', hasFilterTruthyValue);

    /* const {
      dateAdditionFrom = null, dateAdditionTo = null, impFrom = 0, impTo = 10
    } = filterInfo; */

    // todo есть И query И filterInfo, то
    if (query && hasFilterTruthyValue) {
      selectedGroups = selectOnQuery(state.groups, query);

      selectedGroups = selectOnFilterInfo(
        selectedGroups,
        {
          dateAdditionFrom,
          dateAdditionTo,
          impFrom,
          impTo
        },
        true
      );

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }

    // todo если есть query но нет filterInfo
    if (query && !hasFilterTruthyValue) {
      /* state.groups
        .slice()
        .filter((g) => g.title.toLowerCase().includes(query.toLowerCase())) */

      selectedGroups = selectOnQuery(state.groups, query);

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }

    // todo если нет query И есть filterInfo
    if (!query && hasFilterTruthyValue) {
      selectedGroups = selectOnFilterInfo(state.groups, {
        dateAdditionFrom,
        dateAdditionTo,
        impFrom,
        impTo
      });

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }

    /* if (query) {
      selectedGroups = state.groups
        .slice()
        .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    } */

    if (!hasFilterTruthyValue && !query) {
      selectedGroups = state.groups;

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }
  },

  groupNamesAndIds(state) {
    const groupNamesAndIds = state.groups.map((group) => ({
      id: group.groupId,
      title: group.title
    }));
    console.log('groupNamesAndIds: ', groupNamesAndIds);
    // console.log('groupNames: ', groupNames);

    return groupNamesAndIds;
  },

  findGroupOnId(state, _, _2, rootGetters) {
    const id = rootGetters.groupId;
    console.log('id: ', id);

    console.log('state.groups: ', state.groups);
    return state.groups.find((group) => group.groupId === id);
  }

  /* groupOnId(state, getters, rootState, rootGetters) {
    const groupdId = rootGetters.groupId;

    return store.g;
  } */
};
