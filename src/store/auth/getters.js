/* eslint-disable implicit-arrow-linebreak */
export default {
  getCurUser(state) {
    return state.userInfo;
  },

  getAllUsers(state) {
    return state.users;
  },

  didAutoLogout(state) {
    return state.userInfo.didAutoLogout;
  },

  getUserOnId: (state) => ({ login, password }) =>
    state.users.find((user) => user.login === login && user.password === password),

  isLoggedIn(state) {
    return !!state.userInfo.username && !!state.userInfo.jwt && !!state.userInfo.userId;
  },

  isLoginTaken: (state) => (login) => state.users.some((user) => user.login === login)
};
