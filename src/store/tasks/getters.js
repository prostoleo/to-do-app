export default {
  tasksOnGroupId(store, _, _2, rootGetters) {
    // eslint-disable-next-line prefer-destructuring
    const groupId = rootGetters.groupId;
    console.log('groupId: ', groupId);

    return store.tasks.filter((task) => task.groupId === groupId);
  },

  selectedTasks(store) {
    return store.tasks;
  }
};
