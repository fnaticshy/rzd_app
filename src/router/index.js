import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth' });
  }
  else if (to.name === 'auth' && authStore.isAuthenticated) {
    next({ name: 'home' });
  }
  else {
    next();
  }
});

export default router;
