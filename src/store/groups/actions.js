export default {
  addGroup(context, data) {
    console.log('context: ', context);
    const newData = {
      ...data,
      avgImportance: null
    };
    console.log('newData: ', newData);

    context.commit('addGroup', newData);

    localStorage.setItem('to-do-app__groups', JSON.stringify(context.state.groups));
  },

  deleteGroup(context, data) {
    const { groupId } = data;

    context.commit('deleteGroup', groupId);

    localStorage.setItem('to-do-app__groups', JSON.stringify(context.state.groups));
  }
};
