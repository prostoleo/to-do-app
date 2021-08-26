import { AUTO_LOGOUT_SEC } from '../../helpers/config/config';
// eslint-disable-next-line import/no-cycle
import router from '../../router/router.js';

// eslint-disable-next-line no-unused-vars
let timer = null;

export default {
  register(context, data) {
    context.commit('register', data);
  },

  login(context, data) {
    console.log('context: ', context);
    console.log('context.dispatch: ', context.dispatch);

    context.commit('login', data);

    localStorage.setItem('to-do-app__login', data.login);
    localStorage.setItem('to-do-app__password', data.password);
    localStorage.setItem('to-do-app__userId', data.id);

    // console.log('timer: ', timer);
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, AUTO_LOGOUT_SEC * 1000);

    localStorage.setItem('to-do-app__users', JSON.stringify(context.getters.getAllUSers));
  },

  logout(context) {
    console.log('logout: ');
    context.commit('logout');
    localStorage.removeItem('to-do-app__password');
    localStorage.removeItem('to-do-app__login');
    localStorage.removeItem('to-do-app__userId');
    localStorage.removeItem('to-do-app__groups');

    clearTimeout(timer);
    router.replace('/auth');
  },

  autoLogout(context) {
    context.dispatch('logout');
  }
};
