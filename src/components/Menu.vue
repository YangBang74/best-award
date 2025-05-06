<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
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
          <button class="theme-switch">
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox"
              :checked="theme === 'dark'"
              @change="toggleTheme"
            />
            <label for="checkbox" class="label">
              <svg
                class="moon"
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                class="sun"
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12L23 12"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 2V1"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 23V22"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 20L19 19"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 4L19 5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 20L5 19"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4L5 5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 12L2 12"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="ball"></div>
            </label>
          </button>
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
  div {
    padding: 15px 0;
  }
}

.header__logo {
  font-family: 'Special Gothic Expanded One', sans-serif;
  color: var(--text-color);
  font-size: 20px;
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  a {
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.9rem;
    padding: 15px 0;
    font-family: 'Inter', sans-serif;
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
  .header__menu.active {
    right: 0;
  }
  .header__burger {
    display: flex;
  }
}

.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-switch .checkbox {
  opacity: 0;
  position: absolute;
}

.theme-switch .label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 50px;
  position: relative;
  height: 40px;
  width: 80px;
  cursor: pointer;
  box-shadow: var(--switch-shadow);
  transition: var(--transition);
}

.theme-switch .label:hover .moon,
.theme-switch .label:hover .sun {
  transform: rotate(360deg);
}

.theme-switch .ball {
  transition: var(--transition);
  background-color: var(--text-color);
  position: absolute;
  border-radius: 50%;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 30px;
}

.theme-switch .moon {
  color: #f1c40f;
  transform-origin: center center;
  transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transform: rotate(0);
}

.theme-switch .sun {
  color: #ff6b00;
  transform-origin: center center;
  transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transform: rotate(0);
}

.theme-switch .ball {
  transform: translatex(0);
}

.dark .theme-switch .ball {
  transform: translatex(40px);
}

@media (prefers-color-scheme: dark) {
  .theme-switch .ball {
    transform: translatex(40px);
  }

  .light .theme-switch .ball {
    transform: translatex(0);
  }
}
</style>
