import ShortClaims from '@/views/ShortClaims.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: HomeView,
    },
    {
      path: '/short_claims',
      name: 'Список заявок',
      component: ShortClaims,
    },
  ],
});

export default router;
