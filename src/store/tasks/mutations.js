export default {
  addTask(state, data) {
    state.tasks.unshift(data);
  },

  deleteTask(state, index) {
    state.tasks.splice(index, 1);
  },

  deleteTasksOnGroupId(state, groupId) {
    state.tasks = state.tasks.filter((t) => t.groupId !== groupId);
  }
};
