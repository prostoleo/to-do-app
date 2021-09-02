export default {
  /* register(state, data) {
    state.users.push(data);
  }, */

  // eslint-disable-next-line object-curly-newline
  login(state, { username, jwt, id, tokenExpiration }) {
    state.userInfo.username = username;
    state.userInfo.jwt = jwt;
    state.userInfo.userId = id;
    state.userInfo.tokenExpiration = tokenExpiration;
  },

  logout(state) {
    state.userInfo.username = '';
    state.userInfo.jwt = '';

    state.userInfo.userId = '';
  },

  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
