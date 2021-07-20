import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todo/add',
    name: 'AddTodo',
    component: () => import(/* webpackChunkName: "add" */ '../views/AddTodo.vue'),
  },
  {
    path: '/todo/edit/:id',
    name: 'EditTodo',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditTodo.vue'),
  },
  {
    path: '*',
    name: 'NotFoun',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
