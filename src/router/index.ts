import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import CreditsView from '../views/CreditsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
    },
    {
      path: '/credits',
      name: 'credits',
      component: CreditsView,
    },
  ],
})

export default router
