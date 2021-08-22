// import formatAvgImportance from '../../helpers/formatAvgImportance.js';

export default {
  addTask(context, data) {
    console.log('context: ', context);
    console.log('data: ', data);

    const newData = {
      ...data,
      dateOfAddition: new Date(data.dateOfAddition).toISOString(),
      dateOfEnding: new Date(data.dateOfEnding).toString()
      // dateOfEnding: data.dateOfEnding
    };
    console.log('newData: ', newData);

    // const prevAvg = formatAvgImportance(context.getters.
    // calcAvgImportanceOnReceivedGroupId(newData.groupId))
    context.dispatch('handleChangeAvgImportance', {
      groupId: newData.groupId,
      importance: newData.importance,
      isAddTask: true
    });

    context.commit('addTask', newData);
  },

  //* удаляем задание по конкретному taskId
  deleteTask(context, data) {
    console.log('data: ', data);

    const { taskId } = data;

    // const taskIndexToDelete = context.state.tasks.findIndex((task) => task.taskId === taskId);
    const task = context.state.tasks.find((t) => t.taskId === taskId);
    console.log('task: ', task);

    context.dispatch('handleChangeAvgImportance', {
      groupId: task.groupId,
      importance: task.importance,
      isAddTask: false
    });

    context.commit('deleteTask', task);
  },

  updateTask(context, data) {
    console.log('data: ', data);

    context.commit('updateTask', data);
  },

  deleteTasksOnGroupId(context, data) {
    const { groupId } = data;

    context.commit('deleteTasksOnGroupId', groupId);
  },

  handleChangeAvgImportance(context, { groupId, importance, isAddTask }) {
    const prevAvg = context.getters.calcAvgImportanceOnReceivedGroupId(groupId);
    console.log('prevAvg: ', prevAvg);

    const prevLength = context.getters.lengthOfSelectedTasksOnGroupId(groupId);

    context.commit(
      'groups/setNewAvgImportance',
      {
        groupId,
        prevAvg,
        prevLength,
        newImp: importance,
        isAddTask
      },
      { root: true }
    );
  }
};
