export default {
  addTask(context, data) {
    console.log('data: ', data);

    const newData = {
      ...data,
      dateOfAddition: new Date(data.dateOfAddition).toISOString(),
      dateOfEnding: new Date(data.dateOfEnding).toISOString()
    };
    console.log('newData: ', newData);

    context.commit('addTask', newData);
  },

  //* удаляем задание по конкретному taskId
  deleteTask(context, data) {
    console.log('data: ', data);

    const { taskId } = data;

    const taskIndexToDelete = context.state.tasks.findIndex((task) => task.taskId === taskId);

    context.commit('deleteTask', taskIndexToDelete);
  },

  deleteTasksOnGroupId(context, data) {
    const { groupId } = data;

    context.commit('deleteTasksOnGroupId', groupId);
  }
};
