import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '../api'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
  })
  const stored = localStorage.getItem('userTokens')
  if (stored) {
    const parsed = JSON.parse(stored)
    userInfo.value.token = parsed.token || ''
    userInfo.value.refreshToken = parsed.refreshToken || ''
    userInfo.value.userId = parsed.userId || ''
  }
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true
    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      )
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId, // userId в localId
        refreshToken: response.data.refreshToken,
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          userId: userInfo.data.userId, // Сохраняем userId тоже
        }),
      )
    } catch (err) {
      const errorMessage = err?.response?.data?.error?.message
      switch (errorMessage) {
        case 'EMAIL_EXISTS':
          error.value = 'Email exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email not found'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too many attempts, try later'
          break
        case 'USER_DISABLED':
          error.value = 'User disabled'
          break
        case 'INVALID_EMAIL':
          error.value = 'Invalid email'
          break
        case 'MISSING_PASSWORD':
          error.value = 'Missing password'
          break
        case 'MISSING_EMAIL':
          error.value = 'Missing email'
          break
        case 'USER_NOT_FOUND':
          error.value = 'User not found'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Invalid login credentials'
          break
        case 'WEAK_PASSWORD':
          error.value = 'password should be at least 6 characters'
          break
        default:
          error.value = 'Error'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
    }
    localStorage.removeItem('userTokens')
  }

  return { auth, userInfo, error, loader, logout }
})
