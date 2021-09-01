// import formatAvgImportance from '../../helpers/formatAvgImportance.js';

import axios from 'axios';
import { BASE_URL } from '../../helpers/config/config';

export default {
  setTasks(context, data) {
    context.commit('setTasks', data);

    localStorage.setItem('tasks', data);
  },

  async addTask(context, data) {
    try {
      console.log('context: ', context);
      console.log('data: ', data);

      const newData = {
        ...data,
        dateOfAddition: new Date(data.dateOfAddition).toISOString(),
        dateOfEnding: new Date(data.dateOfEnding).toISOString(),
        // dateOfEnding: data.dateOfEnding
        done: false,
        userId: localStorage.getItem('userId')
      };
      console.log('newData: ', newData);

      const resp = await axios.post(`${BASE_URL}tasks`, newData);
      console.log('resp: ', resp);

      if (resp.statusText === 'OK') {
        const dataReceived = resp.data;
        // const prevAvg = formatAvgImportance(context.getters.
        // calcAvgImportanceOnReceivedGroupId(newData.groupId))
        context.dispatch('handleChangeAvgImportance', {
          groupId: newData.groupId,
          importance: newData.importance,
          isAddTask: true
        });

        context.commit('addTask', dataReceived);
      }
    } catch (error) {
      console.error(`💣💣💣 ${error} `);
    }
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
    console.log({ groupId, importance, isAddTask });
    const prevAvg = context.getters.calcAvgImportanceOnReceivedGroupId(groupId);
    console.log('prevAvg: ', prevAvg);

    const prevLength = context.getters.lengthOfSelectedTasksOnGroupId(groupId);

    // todo обращаемся к мутации в другом модуле
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
  },

  toggleDoneStatus(context, { task, status }) {
    const index = context.state.tasks.findIndex((t) => t === task);
    console.log('index: ', index);

    if (index !== -1) {
      context.commit('toggleDoneStatus', {
        index,
        status
      });
    }
  }
};
