/* eslint-disable consistent-return */
import selectOnFilterInfo from '../../helpers/groups/selectOnFilterInfo';
import selectOnQuery from '../../helpers/groups/selectOnQuery';

/* eslint-disable implicit-arrow-linebreak */

export default {
  tasks(state) {
    return state.tasks;
  },

  tasksOnGroupId(store, _, _2, rootGetters) {
    // eslint-disable-next-line prefer-destructuring
    const { groupId } = rootGetters;

    return store.tasks.filter((task) => task.groupId === groupId);
  },

  taskOnId: (state) => (id) => state.tasks.find((t) => t.taskId === id),

  // todo геттер для выбора заданий по параметрам
  // eslint-disable-next-line no-unused-vars
  selectedTasks: (_) => (data) => {
    let selectedTasks = null;
    let tasks = null;

    const tasksOnGroupId = data?.tasksOnGroupId ?? null;
    const allTasks = data?.allTasks ?? null;

    if (tasksOnGroupId) {
      tasks = tasksOnGroupId;
    } else {
      tasks = allTasks;
    }

    const query = data?.query ?? null;

    //* для фильтров
    const filterInfo = data?.filterInfo ?? null;

    //* проверяем есть ли хоть truthy значение в объекте
    const hasFilterTruthyValue = filterInfo ? Object.values(filterInfo).some((v) => !!v) : null;

    //* создаем копию объекта с положительными значениями
    const truthyFilterInfo = {};

    if (hasFilterTruthyValue) {
      Object.entries(filterInfo).forEach(([key, val]) => {
        if (val) truthyFilterInfo[key] = val;
      });
    }

    //* если есть tasksOnGroupId - значит находимся в /groups/:id
    if (query && hasFilterTruthyValue) {
      selectedTasks = selectOnQuery(tasks, query);

      selectedTasks = selectOnFilterInfo(selectedTasks, filterInfo);

      return selectedTasks;
    }

    //* иначе - просто в /tasks
    if (query && !hasFilterTruthyValue) {
      selectedTasks = selectOnQuery(tasks, query);

      return selectedTasks;
    }

    if (!query && hasFilterTruthyValue) {
      selectedTasks = selectOnFilterInfo(tasks, filterInfo);

      return selectedTasks;
    }

    if (!query && !hasFilterTruthyValue) {
      selectedTasks = tasks;

      return selectedTasks;
    }
  },

  lengthOfSelectedTasksOnGroupId: (state) => (id) =>
    state.tasks.filter((t) => t.groupId === id).length,

  calcAvgImportanceOnReceivedGroupId: (state) => (id) =>
    state.tasks
      .filter((t) => t.groupId === id)
      .reduce((acc, t, _, arr) => acc + t.importance / arr.length, 0)
};
