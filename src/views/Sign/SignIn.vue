<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const email = ref()
const password = ref()
const pasCorrect = ref()
const pasColor = ref()

const passwordLengthStatus = computed(() => {
  if (!password.value) {
    return ''
  } else if (password.value.length < 6) {
    pasColor.value = 'red'
    pasCorrect.value = true
    if (locale.value === 'en') {
      return 'Password is too short'
    }
    if (locale.value === 'ru') {
      return 'Пароль слишком короткий'
    }
  } else {
    pasColor.value = 'green'
    if (locale.value === 'en') {
      return 'Your password is strong and acceptable'
    }
    if (locale.value === 'ru') {
      return 'Ваш пароль надежный и приемлемый'
    }
  }
})

const signin = async () => {
  try {
    await authStore.auth({ email: email.value, password: password.value }, 'signin')
    router.push('/')
  } catch (err) {
    console.error('Sign-in failed:', err)
  }
}
</script>

<template>
  <div class="wrap">
    <div class="regstation">
      <h1 class="regstation__title">{{ $t('sign.welcome') }}</h1>
      <p class="resgstation__text">{{ $t('sign.welcome-text') }}</p>
      <div class="error">
        <p v-if="authStore.error">{{ authStore.error }}!</p>
      </div>
      <div class="regstation__form">
        <form @submit.prevent="signin">
          <div class="input__wrap">
            <label for="mail">{{ $t('sign.mail') }}</label>
            <input
              type="email"
              name="mail"
              id="mail"
              :placeholder="$t('sign.mail-plac')"
              v-model="email"
            />
          </div>
          <div class="input__wrap">
            <label for="password">{{ $t('sign.password') }}</label>
            <input
              type="password"
              name="password"
              id="password"
              :placeholder="$t('sign.password-plac')"
              v-model="password"
            />
            <p class="error-password" :style="{ color: pasColor }">{{ passwordLengthStatus }}</p>
          </div>
          <button type="submit" class="regstation__button button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="25px"
              height="25px"
              v-if="authStore.loader"
            >
              <radialGradient
                id="a12"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
              >
                <stop offset="0" stop-color="#000"></stop>
                <stop offset=".3" stop-color="#000" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#000" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#000" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#000" stop-opacity="0"></stop>
              </radialGradient>
              <circle
                transform-origin="center"
                fill="none"
                stroke="url(#a12)"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="200 1000"
                stroke-dashoffset="0"
                cx="100"
                cy="100"
                r="70"
              >
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="0.8"
                  values="360;0"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animateTransform>
              </circle>
              <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="#000"
                stroke-width="15"
                stroke-linecap="round"
                cx="100"
                cy="100"
                r="70"
              ></circle>
            </svg>
            <p v-else>{{ $t('sign.in') }}</p>
          </button>
        </form>
      </div>
      <div class="regstation__sigin">
        <p>
          {{ $t('sign.dont') }}<a href="/signup">{{ $t('sign.up') }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrap {
  height: 100vh;
  align-content: center;
  justify-items: center;
}

.error {
  margin: 15px 0 20px;
  height: 16px;
  color: red;
}

.error-password {
  height: 16px;
  color: red;
}

.container {
  padding: 0 100px;
}

.regstation {
  max-width: 600px;
  margin: 50px auto;
  color: #ffffff;
  background-color: #2c2c2c;
  padding: 50px;
  border-radius: 20px;
  margin: 0 20px;
}

.regstation__title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
}

.regstation__form form {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
}

.regstation__form p {
  text-align: center;
}

.input__wrap {
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input__wrap label {
  font-size: 14px;
  font-weight: 500;
}

.input__wrap input {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px 0 10px 10px;
  font-size: 10px;
  font-weight: 500;
  width: 96%;
}

.regstation__button,
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 100%;
  height: 35px;
  background-color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  color: #000;
}

.regstation__sigin {
  text-align: center;
}

.regstation__sigin a {
  color: #0066ff;
}

@media (max-width: 768px) {
  .regstation {
    padding: 20px 40px;
  }
}
</style>
