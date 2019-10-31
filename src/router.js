import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import(/* webpackChunkName: "about" */ './views/Explore.vue'),
    },
    {
      path: '/comp-signup',
      name: 'compsignup',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUpComp.vue'),
    },
    {
      path: '/prof-signup',
      name: 'profsignup',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUpProf.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/SignIn.vue'),
    },
  ],
});
