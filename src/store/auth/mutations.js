export default {
  /* register(state, data) {
    state.users.push(data);
  }, */

  // eslint-disable-next-line object-curly-newline
  login(state, { username, jwt, id, tokenExpiration }) {
    // console.log('mutation login');
    // console.log({ username, jwt, id, tokenExpiration });

    state.userInfo.username = username;
    state.userInfo.jwt = jwt;
    state.userInfo.userId = id;
    state.userInfo.tokenExpiration = tokenExpiration;
    // console.log('state.userInfo: ', state.userInfo);
  },

  logout(state) {
    state.userInfo.username = '';
    state.userInfo.jwt = '';
    state.userInfo.userId = '';
    state.userInfo.tokenExpiration = '';
    state.userInfo.didAutoLogout = false;
  },

  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
