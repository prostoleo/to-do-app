/* eslint-disable object-curly-newline */
export default {
  setGroups(state, data) {
    state.groups = data;
  },

  addGroup(state, data) {
    state.groups.unshift(data);
  },

  deleteGroup(state, groupId) {
    state.groups = state.groups.filter((g) => g.groupId !== groupId);
  },

  setNewAvgImportance(state, { groupId, prevAvg, prevLength, newImp, isAddTask }) {
    const selected = state.groups.slice().find((g) => g.groupId === groupId);

    const newAvg = isAddTask
      ? (prevAvg * prevLength + newImp) / (prevLength + 1)
      : (prevAvg * prevLength - newImp) / (prevLength - 1);

    selected.avgImportance = newAvg;
  }
};
