import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'award-vue.firebaseapp.com',
  projectId: 'award-vue',
  storageBucket: 'award-vue.firebasestorage.app',
  messagingSenderId: '345191953083',
  appId: '1:345191953083:web:2ccc7a7e3837e4b61daf9e',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
