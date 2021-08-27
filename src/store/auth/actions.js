// import axios from 'axios';
import { AUTO_LOGOUT_SEC } from '../../helpers/config/config';
// eslint-disable-next-line import/no-cycle
import router from '../../router/router.js';

// eslint-disable-next-line no-unused-vars
let timer = null;

export default {
  async register(context, { jwt, createdAt, id }) {
    //* когда токен придет в негодность
    const expiresIn = +AUTO_LOGOUT_SEC * 1000;
    const expirationDate = Date.parse(createdAt) + expiresIn;

    //* все нужное кладем в LS
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', id);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);
  },

  // eslint-disable-next-line object-curly-newline
  login(context, { jwt, username, createdAt, id }) {
    //* когда токен придет в негодность
    const expiresIn = +AUTO_LOGOUT_SEC * 1000;
    const expirationDate = Date.parse(createdAt) + expiresIn;

    //* все нужное кладем в LS
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('login', { username, jwt, id });

    // console.log('timer: ', timer);
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);
  },

  logout(context) {
    console.log('logout: ');
    context.commit('logout');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);
    router.replace('/auth');
  },

  autoLogout(context) {
    context.dispatch('logout');
  }
};
