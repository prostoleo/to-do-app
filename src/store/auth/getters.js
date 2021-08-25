/* eslint-disable implicit-arrow-linebreak */
export default {
  getUserOnId: (state) => ({ login, password }) =>
    state.users.find((user) => user.login === login && user.password === password),

  isLoggedIn(state) {
    return !!state.userInfo.login && !!state.userInfo.password;
  }
};
