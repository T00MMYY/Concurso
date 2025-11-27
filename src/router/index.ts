import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/LandingView.vue'
import Nombre from '../views/NombreView.vue'
import Ranking from '../views/RankingView.vue'
import Juego from '../views/JuegoView.vue'

const routes = [
  {
    path: '/',
    name: 'LandingView',
    component: Landing,
  },
  {
    path: '/nombre',
    name: 'NombreView',
    component: Nombre,
  },
  {
    path: '/ranking',
    name: 'RankingView',
    component: Ranking,
  },
  {
    path: '/juego',
    name: 'JuegoView',
    component: Juego,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
