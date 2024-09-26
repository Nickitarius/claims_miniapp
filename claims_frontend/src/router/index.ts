import { createRouter, createWebHistory } from 'vue-router';
import ClaimsList from '../views/ClaimsList.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: HomeView,
    },
    {
      path: '/claims_list',
      name: 'Список заявок',
      component: ClaimsList,
    },
  ],
});

export default router;
