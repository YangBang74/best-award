import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyDriyxn0X243tRQI40l9Xsl-Y65oK8DOGI',
  authDomain: 'award-vue.firebaseapp.com',
  projectId: 'award-vue',
  storageBucket: 'award-vue.firebasestorage.app',
  messagingSenderId: '345191953083',
  appId: '1:345191953083:web:2ccc7a7e3837e4b61daf9e',
}

// initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
