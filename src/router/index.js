import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/loginpage',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/profilepage',
      name: 'profile',
      component: ProfilePage,
    },
    {
    path: '/registerpage',
    name: 'register',
    component: RegisterPage,
    },
  ],
})

export default router
