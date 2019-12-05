import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(Router);

const router = new Router({
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
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  let requireAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!requireAuth) {
    next();
  }

  if (requireAuth && !token) {
    next('/signin');
  }

  // if (to.path === '/login') {
  //   if (token) {
  //     axiosAuth.post('/verify-token').then(() => {
  //       next('/dashboard');
  //     }).catch(() => {
  //       next();
  //     });
  //   }
  //   else {
  //     next();
  //   }
  // }

  if (requireAuth && token) {
    next();
  }
  next();
});

export default router;
