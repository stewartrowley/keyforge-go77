import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeckView from '@/views/DeckView.vue'
import CardView from '@/views/CardView.vue'
import PodsView from '@/views/PodsView.vue'
import HouseView from '@/views/HouseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/decks',
      name: 'deck',
      component: DeckView,
    },
    {
      path: '/pods',
      name: 'pods',
      component: PodsView,
    },
    {
      path: '/cards',
      name: 'card',
      component: CardView,
    },
    {
      path: '/house/:id',
      name: 'house',
      component: HouseView
    }
  ],
})

export default router
