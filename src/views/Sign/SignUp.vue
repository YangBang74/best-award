<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref()
const password = ref()

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  router.push('/vote')
}
</script>

<template>
  <div class="regstation">
    <div class="container">
      <h1 class="regstation__title">Vote Now!</h1>
      <p class="resgstation__text">Enter your Credentials to acces your account</p>
      <div class="regstation__form">
        <form @submit.prevent="signup">
          <div class="input__wrap">
            <label for="mail">Email address</label>
            <input
              type="email"
              name="mail"
              id="mail"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
          <div class="input__wrap">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create password"
              v-model="password"
            />
          </div>
          <button type="submit" class="regstation__button button">Login</button>
        </form>
      </div>
      <div class="regstation__sigin">
        <p>Do you have an account? <a href="/signup">Sign In</a></p>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
}

.regstation__sigin {
  text-align: center;
}

.regstation__sigin a {
  color: #0066ff;
}
</style>
