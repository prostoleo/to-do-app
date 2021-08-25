export default {
  register(state, data) {
    state.users.push(data);
  },

  login(state, data) {
    state.userInfo.login = data.login;
    state.userInfo.password = data.password;
    state.userInfo.id = data.id;
  }
};
