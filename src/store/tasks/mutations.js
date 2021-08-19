export default {
  addTask(state, data) {
    state.tasks.unshift(data);
  },

  deleteTask(state, task) {
    // state.tasks.splice(index, 1);

    state.tasks = state.tasks.filter((t) => t.taskId !== task.taskId);
  },

  deleteTasksOnGroupId(state, groupId) {
    state.tasks = state.tasks.filter((t) => t.groupId !== groupId);
  }
};
