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
    /* console.log('state.groups: ', state.groups);
    console.log('groupId: ', groupId);
    const selected = state.groups.find((g) => g.groupId === groupId);
    console.log('selected: ', selected);

    const newAvg = isAddTask
      ? (prevAvg * prevLength + newImp) / (prevLength + 1)
      : (prevAvg * prevLength - newImp) / (prevLength - 1); */

    // eslint-disable-next-line no-param-reassign
    selected.avgImportance = newAvg;
  }
};
