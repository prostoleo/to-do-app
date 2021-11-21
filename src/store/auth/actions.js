// import axios from 'axios';
import { AUTO_LOGOUT_SEC } from '../../helpers/config/config';
// eslint-disable-next-line import/no-cycle
import router from '../../router/router.js';

// eslint-disable-next-line no-unused-vars
let timer = null;

export default {
  // eslint-disable-next-line object-curly-newline
  login(context, { jwt, username, id }) {
    // console.log({ jwt, username, id });
    //* когда токен придет в негодность
    const expiresIn = +AUTO_LOGOUT_SEC * 1000;
    // const expiresIn = +process.env.AUTO_LOGOUT_SEC * 1000;
    const expirationDate = +Date.now() + expiresIn;

    //* все нужное кладем в LS
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('login', { username, jwt, id, tokenExpiration: expirationDate });

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);
  },

  tryLogin(context) {
    const token = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // eslint-disable-next-line object-curly-newline
    // const groups = localStorage.getItem('groups');
    // const tasks = localStorage.getItem('tasks');

    const expiresIn = +tokenExpiration - Date.now();

    if (expiresIn < 0) return;

    timer = setTimeout(() => {
      // context.dispatch('logout');
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && username && userId && tokenExpiration) {
      context.commit('login', {
        username,
        jwt: token,
        id: userId,
        tokenExpiration
      });
    }
  },

  logout(context) {
    context.commit('logout');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('groups');
    localStorage.removeItem('tasks');

    clearTimeout(timer);
    router.replace('/');
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
