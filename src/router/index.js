import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/AboutView.vue'
import SignIn from '@/views/Sign/SignIn.vue'
import SignUp from '@/views/Sign/SignUp.vue'
import Awards from '@/views/Awards/Awards.vue'
import BestAlbum from '@/views/Awards/BestAlbum.vue'
import BestSinger from '@/views/Awards/BestSinger.vue'
import BestSong from '@/views/Awards/BestSong.vue'
import Profile from '@/views/Profile.vue'

import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Sign/SignIn.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Sign/SignUp.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/awards',
      name: 'awards',
      component: () => import('@/views/Awards/Awards.vue'),
    },
    {
      path: '/awards/best-album',
      name: 'best-album',
      component: () => import('@/views/Awards/BestAlbum.vue'),
      meta: {
        auth: true,
      },
    },

    {
      path: '/awrards/best-song',
      name: 'best-song',
      component: () => import('@/views/Awards/BestSong.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/awards/best-singer',
      name: 'best-singer',
      component: () => import('@/views/Awards/BestSinger.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/singup')
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next()
  } else {
    next()
  }
})

export default router
