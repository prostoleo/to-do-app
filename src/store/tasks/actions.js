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
      const newData = {
        ...data,
        dateOfAddition: new Date(data.dateOfAddition).toISOString(),
        dateOfEnding: new Date(data.dateOfEnding).toISOString(),
        // dateOfEnding: data.dateOfEnding
        done: false,
        userId: localStorage.getItem('userId')
      };

      context.dispatch('addToken', null, { root: true });
      const resp = await axios.post(`${BASE_URL}/tasks`, newData);

      if (resp.statusText === 'OK') {
        const dataReceived = resp.data;
        context.dispatch('handleChangeAvgImportance', {
          groupId: newData.groupId,
          importance: newData.importance,
          isAddTask: true
        });

        context.commit('addTask', dataReceived);
      }
    } catch (error) {
      console.log(`💣💣💣 ${error} `);
      throw error;
    }
  },

  //* удаляем задание по конкретному taskId
  async deleteTask(context, data) {
    try {
      const { taskId, id } = data;

      context.dispatch('addToken', null, { root: true });
      const resp = await axios.delete(`${BASE_URL}/tasks/${id}`);

      if (resp.statusText === 'OK') {
        const task = context.state.tasks.find((t) => t.taskId === taskId);

        context.dispatch('handleChangeAvgImportance', {
          groupId: task.groupId,
          importance: task.importance,
          isAddTask: false
        });

        context.commit('deleteTask', task);
      }
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
      throw error;
    }
  },

  // todo обновляем задание
  async updateTask(context, data) {
    try {
      context.dispatch('addToken', null, { root: true });
      const resp = await axios.put(`${BASE_URL}/tasks/${data.id}`, data);

      if (resp.statusText === 'OK') {
        const updatedTask = resp.data;

        context.commit('updateTask', updatedTask);
      }
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
      throw error;
    }
  },

  deleteTasksOnGroupId(context, data) {
    const { groupId } = data;

    context.commit('deleteTasksOnGroupId', groupId);
  },

  handleChangeAvgImportance(context, { groupId, importance, isAddTask }) {
    const prevAvg = context.getters.calcAvgImportanceOnReceivedGroupId(groupId);

    const prevLength = context.getters.lengthOfSelectedTasksOnGroupId(groupId);

    // todo обращаемся к мутации в другом модуле
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
      //* находим нужную группу
      const selected = context.rootState.groups.groups.find((g) => g.groupId === groupId);

      //* получили новое значение avgImportance
      const newAvg = isAddTask
        ? (prevAvg * prevLength + newImp) / (prevLength + 1)
        : (prevAvg * prevLength - newImp) / (prevLength - 1);

      const newAvgCleared = Number.parseFloat(newAvg.toFixed(2));

      context.dispatch('addToken', null, { root: true });
      // * отправляем запрос в strapi для изменения на новый avgImportance
      const resp = await axios.put(`${BASE_URL}/groups/${selected.id}`, {
        ...selected,
        avgImportance: newAvgCleared
      });

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
  async toggleDoneStatus(context, { task, status, isTasksRoute }) {
    try {
      context.commit('toggleDoneStatus', {
        task,
        status
      });
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    }
  }
};
