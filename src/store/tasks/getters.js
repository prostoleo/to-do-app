export default {
  tasksOnGroupId(store, _, _2, rootGetters) {
    // eslint-disable-next-line prefer-destructuring
    const { groupId } = rootGetters;
    console.log('groupId: ', groupId);

    return store.tasks.filter((task) => task.groupId === groupId);
  },

  // todo геттер для выбора заданий по параметрам
  // eslint-disable-next-line consistent-return
  selectedTasks: (state) => (data) => {
    const tasksOnGroupId = data?.tasksOnGroupId ?? null;
    const query = data?.query ?? null;
    let selectedTasks = null;

    //* если есть tasksOnGroupId - значит находимся в /groups/:id
    if (tasksOnGroupId) {
      if (query) {
        selectedTasks = tasksOnGroupId
          .slice()
          .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));

        return selectedTasks;
      }

      selectedTasks = tasksOnGroupId.slice();

      return selectedTasks;
    }

    //* иначе - просто в /tasks
    if (query) {
      selectedTasks = state.tasks
        .slice()
        .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));

      console.log('selectedTasks: ', selectedTasks);
      return selectedTasks;
    }

    selectedTasks = state.tasks;
    return selectedTasks;
  }
};
