<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const menuActive = ref(false)

const toggleMenu = () => {
  menuActive.value = !menuActive.value
  document.body.classList.toggle('lock')
}

const router = useRouter()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}
checkUser()
const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <a class="header__logo" href="/">Best.Award</a>
        <nav class="header__menu" :class="{ active: menuActive }">
          <a href="/">Home</a>
          <a href="/awards">Awards</a>
          <a href="/about">About</a>
        </nav>
        <div class="header__action">
          <!-- <router-link to="/profile" v-if="token" type="button" class="header__profil">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.5" />
              <path
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </router-link> -->
          <router-link to="/signin" v-if="!token">Sign In</router-link>
          <router-link class="menu__link" to="/signin" v-if="token" @click.prevent="logout"
            >Logout</router-link
          >
          <button
            type="button"
            class="header__burger"
            @click="toggleMenu"
            :class="{ active: menuActive }"
          >
            <span class="header__burger-line"></span>
            <span class="header__burger-line"></span>
            <span class="header__burger-line"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
body.lock {
  overflow: hidden;
}

.header {
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  z-index: 50;
  border-bottom: 1px solid #dddcdc;
  transition: 0.2s;
}

.header__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  div {
    padding: 15px 0;
  }
}

.header__logo {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 20px;
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  a {
    color: #000000;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 15px 0;
    font-family: 'Inter', sans-serif;
  }
  a:hover {
    color: #646464;
  }
}

.header__profil {
  background: none;
  border: none;
  margin-top: 2px;
}

.header__action {
  display: flex;
  align-items: center;
  gap: 20px;
  a {
    color: #000000;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
  }
  a:hover {
    color: #646464;
  }
}

.header__burger {
  display: none;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  background: none;
  border: none;
}

.header__burger-line {
  width: 30px;
  height: 3px;
  background-color: #000000;
  margin: 3px 0;
  transition: all 0.3s ease;
}

.header__burger.active .header__burger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.header__burger.active .header__burger-line:nth-child(2) {
  opacity: 0;
}
.header__burger.active .header__burger-line:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -7px);
}

@media (max-width: 1024px) {
  .header__menu {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .header__menu {
    background-color: #ffffff;
    position: absolute;
    flex-direction: column;
    justify-content: start;
    padding: 70px 0;
    gap: 40px;
    top: 0;
    right: -1000%;
    width: 100%;
    height: 100vh;
    transition: 0.2s;
    a {
      font-size: 20px;
    }
  }
  .header__menu.active {
    right: 0;
  }
  .header__burger {
    display: flex;
  }
}
</style>
