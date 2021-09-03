import axios from 'axios';
import { BASE_URL } from '../../helpers/config/config.js';

export default {
  setGroups(context, data) {
    console.log('data: ', data);
    context.commit('setGroups', data);
  },

  async addGroup(context, data) {
    try {
      console.log('context: ', context);
      const newData = {
        ...data,
        avgImportance: data?.avgImportance ?? null
      };
      console.log('newData: ', newData);

      /* context.commit('addGroup', newData);

      localStorage.setItem('to-do-app__groups', JSON.stringify(context.state.groups)); */

      // const resp = await axios.post(`${BASE_URL}groups?id=${newData.userId}`, newData);
      const resp = await axios.post(`${BASE_URL}groups`, newData);
      console.log('resp: ', resp);

      if (resp.statusText === 'OK') {
        const res = resp.data;
        console.log('res: ', res);

        context.commit('addGroup', res);

        localStorage.setItem('groups', JSON.stringify(context.state.groups));

        /* const groups = data.filter((g) => g.id === +userId);
        console.log('groups: ', groups); */
      } else {
        throw new Error('Упс, что-то пошло не так 😞. Попробуйте повторить позже');
      }
    } catch (error) {
      console.log(`${error.mesage}, не удалось добавить группу`);
    }
  },

  async deleteGroup(context, data) {
    try {
      //* удаляем группу в strapi
      const resp = await axios.delete(`${BASE_URL}groups/${data.id}`);
      console.log('resp: ', resp);

      //* удаляем группу локально
      if (resp.statusText === 'OK') {
        const { id } = data;

        context.commit('deleteGroup', id);

        localStorage.setItem('groups', JSON.stringify(context.state.groups));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};
