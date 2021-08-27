export default {
  /* register(state, data) {
    state.users.push(data);
  }, */

  login(state, { username, jwt, id }) {
    state.userInfo.username = username;
    state.userInfo.jwt = jwt;

    state.userInfo.userId = id;
  },

  logout(state) {
    state.userInfo.username = '';
    state.userInfo.jwt = '';

    state.userInfo.userId = '';
  }
};
