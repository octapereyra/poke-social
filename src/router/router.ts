import Index from '@/views/Index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      children: [],
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetails',
      component: () => import('@/views/Pokemon.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
