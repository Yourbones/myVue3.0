import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('../views/mine.vue'),
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('../views/card.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
