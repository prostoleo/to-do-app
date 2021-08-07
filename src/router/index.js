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
    path: '/:pathMath(.*)',
    component: NotFound
  }
  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(// webpackChunkName: "about" // '../views/About.vue'),
  }, */
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
