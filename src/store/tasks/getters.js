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
    console.log('groupId: ', groupId);

    return store.tasks.filter((task) => task.groupId === groupId);
  },

  taskOnId: (state) => (id) => state.tasks.find((t) => t.taskId === id),

  // todo геттер для выбора заданий по параметрам
  // eslint-disable-next-line no-unused-vars
  selectedTasks: (_) => (data) => {
    let selectedTasks = null;
    let tasks = null;

    const tasksOnGroupId = data?.tasksOnGroupId ?? null;
    console.log('tasksOnGroupId: ', tasksOnGroupId);
    const allTasks = data?.allTasks ?? null;

    if (tasksOnGroupId) {
      tasks = tasksOnGroupId;
    } else {
      tasks = allTasks;
    }

    const query = data?.query ?? null;
    console.log('query: ', query);

    //* для фильтров
    const filterInfo = data?.filterInfo ?? null;
    console.log('filterInfo: ', filterInfo);

    //* получаем свойства в отдельные параметры, при этом указываем значение по умолчанию
    /* const dateEndingFrom = filterInfo?.dateAdditionFrom ?? null;
    const dateEndingTo = filterInfo?.dateAdditionTo ?? null;
    const impFrom = filterInfo?.impFrom ?? null;
    const impTo = filterInfo?.impTo ?? null; */

    //* проверяем есть ли хоть truthy значение в объекте
    const hasFilterTruthyValue = filterInfo ? Object.values(filterInfo).some((v) => !!v) : null;

    //* создаем копию объекта с положительными значениями
    const truthyFilterInfo = {};

    if (hasFilterTruthyValue) {
      Object.entries(filterInfo).forEach(([key, val]) => {
        if (val) truthyFilterInfo[key] = val;
      });
    }

    console.log('truthyFilterInfo: ', truthyFilterInfo);

    //* если есть tasksOnGroupId - значит находимся в /groups/:id
    if (query && hasFilterTruthyValue) {
      console.log('query && hasFilterTruthyValue');

      selectedTasks = selectOnQuery(tasks, query);

      /* selectedTasks = selectOnFilterInfo(selectedTasks, {
        dateEndingFrom,
        dateEndingTo,
        impFrom,
        impTo
      }); */

      selectedTasks = selectOnFilterInfo(selectedTasks, truthyFilterInfo);

      return selectedTasks;
    }

    //* иначе - просто в /tasks
    if (query && !hasFilterTruthyValue) {
      console.log('query && !hasFilterTruthyValue');

      selectedTasks = selectOnQuery(tasks, query);

      console.log('selectedTasks: ', selectedTasks);
      return selectedTasks;
    }

    if (!query && hasFilterTruthyValue) {
      console.log('!query && hasFilterTruthyValue');

      /* selectedTasks = selectOnFilterInfo(tasks, {
        dateEndingFrom,
        dateEndingTo,
        impFrom,
        impTo
      }); */

      selectedTasks = selectOnFilterInfo(tasks, truthyFilterInfo);

      console.log('selectedTasks: ', selectedTasks);
      return selectedTasks;
    }

    if (!query && !hasFilterTruthyValue) {
      console.log('!query && !hasFilterTruthyValue');

      selectedTasks = tasks;

      console.log('selectedTasks: ', selectedTasks);
      return selectedTasks;
    }

    // selectedTasks = state.tasks;
  },

  lengthOfSelectedTasksOnGroupId: (state) => (id) =>
    state.tasks.filter((t) => t.groupId === id).length,

  calcAvgImportanceOnReceivedGroupId: (state) => (id) =>
    state.tasks
      .filter((t) => t.groupId === id)
      .reduce((acc, t, _, arr) => acc + t.importance / arr.length, 0)
  // state.tasks.filter((t) => t.groupId === id)
};
