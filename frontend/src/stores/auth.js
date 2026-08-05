import { defineStore } from 'pinia'
import { request } from '../api/client'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isAuthed: (s) => !!s.token,
  },
  actions: {
    async login(email, password) {
      const data = await request('/auth/login', { method: 'POST', body: { email, password } })
      this.setAuth(data)
    },
    async register(payload) {
      const data = await request('/auth/register', { method: 'POST', body: payload })
      this.setAuth(data)
    },
    setAuth(data) {
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})