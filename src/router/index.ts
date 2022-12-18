import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/myday/menu'
  },
  {
    path: '/myday/menu',
    component: () => import ('../myday/MenuPage.vue')
  },
  {
    path: '/myday/expense',
    component: () => import ('../myday/ExpensePage.vue')
  },
  {
    path: '/myday/expense/:id',
    component: () => import ('../myday/ExpenseDetail.vue')
  },
  {
    path: '/myday/activity/list',
    component: () => import ('../myday/ActivityList.vue')
  },
  {
    path: '/myday/activity',
    component: () => import ('../myday/ActivityPage.vue')
  },
  {
    path: '/myday/activity/:id',
    name: 'edit-activity',
    component: () => import ('../myday/ActivityDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
