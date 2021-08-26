/* eslint-disable implicit-arrow-linebreak */
export default {
  getCurUser(state) {
    return state.userInfo;
  },

  getAllUsers(state) {
    return state.users;
  },

  getUserOnId: (state) => ({ login, password }) =>
    state.users.find((user) => user.login === login && user.password === password),

  isLoggedIn(state) {
    return !!state.userInfo.login && !!state.userInfo.password;
  },

  isLoginTaken: (state) => (login) => state.users.some((user) => user.login === login)
};
