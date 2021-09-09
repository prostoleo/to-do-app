/* eslint-disable object-curly-newline */
export default {
  setGroups(state, data) {
    state.groups = data;
  },

  addGroup(state, data) {
    state.groups.unshift(data);
  },

  deleteGroup(state, id) {
    // state.groups = state.groups.filter((g) => g.groupId !== groupId);
    state.groups = state.groups.filter((g) => g.id !== id);
  },

  setNewAvgImportance(_, { selected, newAvg }) {
    // eslint-disable-next-line no-param-reassign
    selected.avgImportance = newAvg;
  }
};
