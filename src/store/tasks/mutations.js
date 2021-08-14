export default {
  addTask(state, data) {
    state.tasks.unshift(data);
  }
};
