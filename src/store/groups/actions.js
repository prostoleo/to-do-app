export default {
  addGroup(context, data) {
    const newData = {
      ...data,
      avgImportance: null
    };
    console.log('newData: ', newData);

    context.commit('addGroup', newData);
  },

  deleteGroup(context, data) {
    const { groupId } = data;

    context.commit('deleteGroup', groupId);
  }
};
