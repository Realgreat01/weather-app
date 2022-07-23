import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WeatherPage from '../components/WeatherPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    component: HomePage
  },
  {
    path: '/weather',
    name: 'weather',
    alias: '/weather',
    component: WeatherPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
