import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/transacoes',
    name: 'transacoes',
    component: () => import('../views/Transacoes.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('../views/Categorias.vue')
  },
  {
    path: '/orcamentos',
    name: 'orcamentos',
    component: () => import('../views/Orcamentos.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/Loading.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
