import { defineStore } from 'pinia'
export const mainStore = defineStore('main', {
  state: () => ({
    serverLink: 'https://dashboard-server-otm9.onrender.com'
  })
})
