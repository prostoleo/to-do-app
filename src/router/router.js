/* eslint-disable import/no-cycle */
import { createRouter, createWebHistory } from 'vue-router';

// todo импортируем store
import store from '../store/index.js';

import Auth from '../views/Auth.vue';
import Groups from '../views/Groups.vue';

// import GroupId from '../views/GroupId.vue';
// import TaskId from '../views/TaskId.vue';
// import Tasks from '../views/Tasks.vue';
// import NotFound from '../views/NotFound.vue';

const GroupId = () => import('../views/GroupId.vue');
const TaskId = () => import('../views/TaskId.vue');
const Tasks = () => import('../views/Tasks.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  /* {
    path: '/',
    redirect: '/groups',
    meta: { requiresAuth: true }
  }, */
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: { requiresUnauth: true }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
    meta: { requiresAuth: true }
  },
  {
    path: '/groups/:id',
    name: 'GroupId',
    component: GroupId,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/:taskId',
    name: 'Task',
    component: TaskId,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/:notFound(.*)',
    component: NotFound,
    name: 'NotFound'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// todo global navigation guard - проверка можно ли отображать какую-то страницу или нет - перед каждым переходом будет срабатывать эта функция

//* также добавляем meta tag для нужных routes
router.beforeEach((to) => {
  //* если страница требует аутентификацию и пользователь НЕ зашел в аккаунт - отказать в доступе
  if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']) {
    // next(false);
    router.replace('/');
    //* если страница НЕ требует аутентификацию и пользователь зашел в аккаунт - отказать в доступе
  }

  if (to.meta.requiresUnauth && store.getters['auth/isLoggedIn']) {
    router.replace('/groups');
  }
});

export default router;
