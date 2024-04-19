import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUp.vue')
    }
  ]
})

export default router
