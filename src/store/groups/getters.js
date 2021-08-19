export default {
  groups(state) {
    return state.groups;
  },

  selectedGroups: (state) => (data) => {
    let selectedGroups = null;

    //* поисковый запрос
    const query = data?.query ?? null;
    console.log('query: ', query);

    //* для фильтров
    const filterInfo = data?.filterInfo ?? null;
    console.log('filterInfo: ', filterInfo);

    //* получаем свойства в отдельные параметры, при этом указываем значение по умолчанию
    const dateEndingFrom = filterInfo?.dateEndingFrom ?? null;
    const dateEndingTo = filterInfo?.dateEndingTo ?? null;
    const impFrom = filterInfo?.impFrom ?? 0;
    const impTo = filterInfo?.dateEndingFrom ?? 10;
    /* const {
      dateEndingFrom = null, dateEndingTo = null, impFrom = 0, impTo = 10
    } = filterInfo; */

    // todo если есть query
    if (query) {
      selectedGroups = state.groups
        .slice()
        .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
    }

    // todo если есть filterInfo и query - ищем сначала по query, потом по filterInfo
    if (filterInfo && query) {
      //* если есть поля impFrom или impTo - то фильтрцем по важности (конверитуря в числа!)
      if (impFrom || impTo) {
        selectedGroups = selectedGroups.filter(
          (g) => g.avgImportance >= +impFrom && g.avgImportance <= +impTo
        );
      }

      if (dateEndingFrom && dateEndingTo) {
        selectedGroups = selectedGroups.filter(
          (g) => g.avgImportance >= new Date(dateEndingFrom).getTime() &&
            g.avgImportance <= new Date(dateEndingTo).getTime()
        );
      }

      if (dateEndingFrom) {
        selectedGroups = selectedGroups.filter(
          (g) => g.avgImportance >= new Date(dateEndingFrom).getTime()
        );
      }

      if (dateEndingTo) {
        selectedGroups = selectedGroups.filter(
          (g) => g.avgImportance <= new Date(dateEndingTo).getTime()
        );
      }

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }

    if (query) {
      selectedGroups = state.groups
        .slice()
        .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));

      console.log('selectedGroups: ', selectedGroups);
      return selectedGroups;
    }

    selectedGroups = state.groups;

    console.log('selectedGroups: ', selectedGroups);
    return selectedGroups;
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
