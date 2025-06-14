<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ThemeButton from './UI/ThemeButton.vue'
import LangChange from './UI/LangChange.vue'

const authStore = useAuthStore()
const menuActive = ref(false)

const toggleMenu = () => {
  menuActive.value = !menuActive.value
  document.body.classList.toggle('lock')
}

const closeMenu = () => {
  menuActive.value = false
  document.body.classList.remove('lock')
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
        <router-link class="header__logo" to="/">Best.Award</router-link>
        <nav class="header__menu" :class="{ active: menuActive }">
          <router-link to="/" @click="closeMenu">{{ $t('header.nav.home') }}</router-link>
          <router-link to="/awards" @click="closeMenu">{{ $t('header.nav.awards') }}</router-link>
          <router-link to="/about" @click="closeMenu">{{ $t('header.nav.about') }}</router-link>
          <LangChange />
        </nav>
        <div class="header__action">
          <ThemeButton />
          <router-link to="/signin" v-if="!token">{{ $t('header.actions.signIn') }}</router-link>
          <router-link class="menu__link" to="/signin" v-if="token" @click.prevent="logout">{{
            $t('header.actions.logOut')
          }}</router-link>
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
  background-color: var(--header-bg);
  color: var(--text-color);
  z-index: 50;
  border-bottom: 1px solid var(--border-buttom);
  transition: 0.2s;
}

.header__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
}

.header__logo {
  font-family: var(--second-font);
  color: var(--text-color);
  font-size: 20px;
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;
  a {
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.9rem;
    padding: 15px 0;
  }
  a:hover {
    color: var(--text-color-hover);
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
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
  }
  a:hover {
    color: var(--text-color-hover);
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
  background-color: var(--text-color);
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
    background-color: var(--background-color);
    position: absolute;
    flex-direction: column;
    justify-content: start;
    padding: 70px 0;
    gap: 40px;
    top: 60px;
    right: -1000%;
    width: 100%;
    height: 100vh;
    transition: 0.2s;
    z-index: 10000;
    a {
      font-size: 20px;
    }
  }
  .header__wrap > div {
    padding: 10px 0;
  }
  .header__menu.active {
    right: 0;
  }
  .header__burger {
    display: flex;
  }
  .header__action {
    gap: 10px;
  }
}

@media (max-width: 380px) {
  .header__logo {
    font-size: 16px;
  }
}
</style>
