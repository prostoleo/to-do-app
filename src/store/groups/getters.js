export default {
  groups(store) {
    return store.groups;
  },

  findGroupOnId(state, _, _2, rootGetters) {
    const id = rootGetters.groupId;
    console.log('id: ', id);

    console.log('state.groups: ', state.groups);
    return state.groups.find((group) => group.groupId === id);
  }

  /* groupOnId(store, getters, rootState, rootGetters) {
    const groupdId = rootGetters.groupId;

    return store.g;
  } */
};
