import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/AboutView.vue'
import SignIn from '../views/Sign/SignIn.vue'
import SignUp from '../views/Sign/SignUp.vue'
import Vote from '../views/Vote/Vote.vue'
import VoteBestFeat from '../views/Vote/VoteBestFeat.vue'
import VoteBestAlbum from '../views/Vote/VoteBestAlbum.vue'
import VoteBestSong from '../views/Vote/VoteBestSong.vue'
import Profile from '../views/Profile.vue'

import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        auth: false,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        auth: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        auth: true,
      },
    },
    {
      path: '/vote',
      name: 'vote',
      component: Vote,
    },
    {
      path: '/vote/vote-best-album',
      name: 'vote-best-album',
      component: VoteBestAlbum,
      meta: {
        auth: true,
      },
    },

    {
      path: '/vote/vote-best-song',
      name: 'vote-best-song',
      component: VoteBestSong,
      meta: {
        auth: true,
      },
    },
    {
      path: '/vote/vote-best-feat',
      name: 'vote-best-feat',
      component: VoteBestFeat,
      meta: {
        auth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next()
  } else {
    next()
  }
})

export default router
