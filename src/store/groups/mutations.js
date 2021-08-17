export default {
  addGroup(state, data) {
    state.groups.unshift(data);
  },

  deleteGroup(state, groupId) {
    state.groups = state.groups.filter((g) => g.groupId !== groupId);
  }
};
