export default {
  setTasks(state, data) {
    state.tasks = data;
  },

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
    state.tasks = state.tasks.filter((t) => t.taskId !== task.taskId);
  },

  deleteTasksOnGroupId(state, groupId) {
    state.tasks = state.tasks.filter((t) => t.groupId !== groupId);
  },

  toggleDoneStatus(state, { task, status }) {
    const taskToChange = state.tasks.find((t) => t.taskId === task.taskId);

    taskToChange.done = status;
  }
};
