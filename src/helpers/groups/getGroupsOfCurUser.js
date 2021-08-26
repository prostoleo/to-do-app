import store from '../../store';

export default function foo() {
  const groups = JSON.parse(localStorage.getItem('to-do-app__groups'));

  const { userId } = store.getters['auth/getCurUser'];

  return groups.filter((g) => g.userId === userId);
}
