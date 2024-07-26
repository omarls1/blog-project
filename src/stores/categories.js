import { defineStore } from 'pinia'
import axios from 'axios'
export const categoryStore = defineStore('categories', {
  state: () => ({
    servCate: 'http://localhost:3000/categories',
    newCate: 'http://localhost:3000/categories/new'
  }),
  actions: {
    async getAllCategories() {
      try {
        const res = await axios.get(this.servCate)
        return JSON.stringify(res.data)
      } catch (err) {
        return 'فشل احضار البيانات'
      }
    },
    async newCategory(data) {
      try {
        await axios.post(this.newCate, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (err) {
        console.log('فشل الارسال ' + err)
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3000/categories/${id}`)
      } catch (err) {
        return 'فشل الحذف' + err
      }
    }
  }
})
