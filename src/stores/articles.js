import { defineStore } from 'pinia'
import axios from 'axios'
import { mainStore } from '@/stores/main'

export const articleStore = defineStore('articles', {
  state: () => ({
    articlesLink: `${mainStore().serverLink}/posts`,
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
