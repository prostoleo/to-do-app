export default {
  register(context, data) {
    context.commit('register', data);
  },

  login(context, data) {
    context.commit('login', data);
  }
};
