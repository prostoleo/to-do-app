import { createRouter, createWebHistory } from 'vue-router';
import Groups from '../views/Groups.vue';
import GroupId from '../views/GroupId.vue';
import Tasks from '../views/Tasks.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: '/groups'
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/groups/:id',
    name: 'GroupId',
    component: GroupId,
    props: true
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/:notFound(.*)',
    component: NotFound,
    name: 'Not-Found'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
