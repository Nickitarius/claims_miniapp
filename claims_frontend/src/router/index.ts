import { createRouter, createWebHistory } from 'vue-router';
import Claim from '../views/ClaimPage.vue';
import ClaimsList from '../views/ClaimsList.vue';
import Error from '../views/ErrorView.vue';
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
    { path: '/claim/:claim_no', name: 'Заявка', component: Claim },
    { path: '/error', name: 'Ошибка', component: Error },
  ],
});

export default router;
