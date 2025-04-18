import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/test/location',
      name: 'test-location',
      component: () => import('../views/Test/Location.vue')
    },
    {
      path: '/test/model',
      name: 'test-model',
      component: () => import('../views/Test/Model.vue')
    },
    {
      path: '/test/model/implementation',
      name: 'test-model-imple',
      component: () => import('../views/Test/Model.implementation.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
