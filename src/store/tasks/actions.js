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
  async deleteTask(context, data) {
    try {
      console.log('data: ', data);

      const { taskId, id } = data;

      console.log({ taskId, id });

      const resp = await axios.delete(`${BASE_URL}tasks/${id}`);
      console.log('resp: ', resp);

      if (resp.statusText === 'OK') {
        // const taskIndexToDelete = context.state.tasks.findIndex((task) => task.taskId === taskId);
        const task = context.state.tasks.find((t) => t.taskId === taskId);
        console.log('task: ', task);

        context.dispatch('handleChangeAvgImportance', {
          groupId: task.groupId,
          importance: task.importance,
          isAddTask: false
        });

        context.commit('deleteTask', task);
      }
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    }
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
    /* context.commit(
      'groups/setNewAvgImportance',
      {
        groupId,
        prevAvg,
        prevLength,
        newImp: importance,
        isAddTask
      },
      { root: true }
    ); */
    context.dispatch('setNewAvgImportance', {
      groupId,
      prevAvg,
      prevLength,
      newImp: importance,
      isAddTask
    });
  },

  // eslint-disable-next-line no-unused-vars
  async setNewAvgImportance(context, { groupId, prevAvg, prevLength, newImp, isAddTask }) {
    try {
      console.log('context - setNewAvgImportance: ', context);
      console.log('context.rootState.groups - setNewAvgImportance: ', context.rootState.groups);

      console.log('groupId: ', groupId);

      //* находим нужную группу
      const selected = context.rootState.groups.groups.find((g) => g.groupId === groupId);
      console.log('selected: ', selected);

      //* получили новое значение avgImportance
      const newAvg = isAddTask
        ? (prevAvg * prevLength + newImp) / (prevLength + 1)
        : (prevAvg * prevLength - newImp) / (prevLength - 1);

      console.log('newAvg: ', newAvg);

      const newAvgCleared = Number.parseFloat(newAvg.toFixed(2));

      // * отправляем запрос в strapi для изменения на новый avgImportance
      const resp = await axios.put(`${BASE_URL}groups/${selected.id}`, {
        ...selected,
        avgImportance: newAvgCleared
      });
      console.log('resp: ', resp);

      if (resp.statusText === 'OK') {
        context.commit(
          'groups/setNewAvgImportance',
          {
            selected,
            newAvgCleared
          },
          { root: true }
        );
      }
    } catch (error) {
      console.warn(`💣💣💣 ${error}, не удалось обновить avgImportance`);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async toggleDoneStatus(context, { task, status }) {
    console.log('context: ', context);
    try {
      const { userId } = context.rootState.auth.userInfo;

      const res = await axios.get(`${BASE_URL}tasks?userId=${userId}`);

      if (res.statusText === 'OK') {
        const tasks = res.data;

        context.commit('setTasks', tasks);
        context.commit('toggleDoneStatus', {
          task,
          status
        });
      }
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    }
  }
};
