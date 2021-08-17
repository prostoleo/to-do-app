export default {
  groups(state) {
    return state.groups;
  },

  selectedGroups: (state) => (data) => {
    let selectedGroups = null;

    const query = data?.query ?? null;
    console.log('query: ', query);

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
