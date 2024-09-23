import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ShortClaims from '@/views/ShortClaims.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/short_claims',
      name: 'Заявки',
      component: ShortClaims,
    },
  ],
});

export default router;
