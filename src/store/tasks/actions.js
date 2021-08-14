export default {
  addTask(context, data) {
    console.log('data: ', data);

    const newData = {
      ...data,
      dateOfAddition: new Date(data.dateOfAddition).toISOString(),
      dateOfEnding: new Date(data.dateOfEnding).toISOString()
    };
    console.log('newData: ', newData);

    context.commit('addTask', newData);
  }
};
