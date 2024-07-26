import { defineStore } from 'pinia'
import axios from 'axios'

export const articleStore = defineStore('articles', {
  state: () => ({
    articlesLink: 'http://localhost:3000/posts',
    allArticles: []
  }),
  actions: {
    async getAllPosts() {
      try {
        const res = await axios.get(this.articlesLink)
        this.allArticles = res.data // تعيين البيانات بشكل صحيح
      } catch (error) {
        console.error(error)
      }
    }
  }
})
