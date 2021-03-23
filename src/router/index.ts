import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DEMAND_POOL from './requirements/index'
import Layout from '../views/layout/index.vue'
import Login from '../views/login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
      },
      ...DEMAND_POOL,
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
