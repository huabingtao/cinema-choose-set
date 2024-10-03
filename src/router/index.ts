import Home from '@/views/HomeView.vue'
import ScreeningRoom from '@/views/ScreeningRoom.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/screening-room',
      name: 'ScreeningRoom',
      component: ScreeningRoom
    }
  ]
})

export default router
