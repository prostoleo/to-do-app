import store from '../../store';

export default function foo() {
  const tasks = JSON.parse(localStorage.getItem('to-do-app__groups'));

  const { userId } = store.getters['auth/getCurUser'];

  return tasks.filter((t) => t.userId === userId);
}
