import axios from 'axios';
import { BASE_URL } from '../../helpers/config/config.js';

export default {
  setGroups(context, data) {
    context.commit('setGroups', data);
  },

  addGroup(context, data) {
    context.commit('addGroup', data);
    localStorage.setItem('groups', JSON.stringify(context.state.groups));
  },

  async deleteGroup(context, data) {
    try {
      context.dispatch('addToken', null, { root: true });

      //* удаляем группу в strapi и сопутствующие дела
      const requests = [
        axios.delete(`${BASE_URL}/groups/${data.id}`),
        axios.delete(`${BASE_URL}/tasks/deleteAll/${data.groupId}`)
      ];

      const resp = await Promise.all(requests);

      //* удаляем группу локально
      if (resp[0].statusText === 'OK' && resp[1].statusText === 'OK') {
        const { id } = data;

        //* удаляем группу локально
        context.commit('deleteGroup', id);
        //* удаляем нужные tasks локально
        context.dispatch('tasks/deleteTasksOnGroupId', data, { root: true });

        localStorage.setItem('groups', JSON.stringify(context.state.groups));
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
};
