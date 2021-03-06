export default {
  addTask(state, data) {
    state.tasks.unshift(data);
  },

  updateTask(state, data) {
    const { taskId } = data;
    const { tasks } = state;

    const taskToUpdateIndex = tasks.findIndex((t) => t.taskId === taskId);

    if (taskToUpdateIndex) tasks[taskToUpdateIndex] = data;
  },

  deleteTask(state, task) {
    // state.tasks.splice(index, 1);

    state.tasks = state.tasks.filter((t) => t.taskId !== task.taskId);
  },

  deleteTasksOnGroupId(state, groupId) {
    state.tasks = state.tasks.filter((t) => t.groupId !== groupId);
  },

  toggleDoneStatus(state, { index, status }) {
    console.log('status: ', status);
    state.tasks[index].done = status;
    console.log('state.tasks[index]: ', state.tasks[index]);
  }
};
