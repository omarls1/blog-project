<script setup>
import { categoryStore } from '@/stores/categories'
import { onMounted, ref } from 'vue'

const store = categoryStore()
const categories = ref([])

onMounted(async () => {
  fetchCategories()
})

const handleSubmit = async (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  await store.newCategory(formData)
  await fetchCategories()
}

const fetchCategories = async () => {
  const req = await store.getAllCategories()
  categories.value = JSON.parse(req) // إعادة جلب التصنيفات
}

const handleDelete = async (event) => {
  const element = event.target.closest('.card')
  const id = element.dataset.categoryId


  element.classList.add('animate__fadeOutRight')

  setTimeout(async () => {
    await store.deleteCategory(id)
    await fetchCategories() // إعادة جلب التصنيفات بعد الحذف
  }, 500)
}
</script>

<template>
  <div class="flex p-6 justify-between w-full flex-wrap lg:px-14 space-y-6 lg:space-y-0 categories">
    <!-- قائمة التصنيفات -->
    <div class="w-full lg:w-3/5 bg-white p-1 rounded shadow-lg category-list">
      <h2 class="text-2xl font-bold mb-6 text-center mt-6">قائمة التصنيفات</h2>
      <div class="cards my-3 space-y-6">
        <div
          v-for="category in categories"
          :key="category.CategoryId"
          :data-category-id="category.CategoryId"
          class="shadow-lg p-6 bg-white mx-5 rounded-md transition-all duration-300 hover:shadow-xl cursor-pointer animate__animated animate__fadeInRight card"
        >
          <h3 class="text-xl font-semibold mb-2">{{ category.title }}</h3>
          <p class="text-gray-600 mb-4">{{ category.description }}</p>
          <span class="block text-gray-500 mb-1"
            ><i class="fas fa-calendar-alt"></i> تم الإنشاء بتاريخ {{ category.date }}</span
          >
          <span class="block text-gray-500 mb-4"
            ><i class="fas fa-file-alt"></i> عدد المقالات 67</span
          >
          <div class="flex justify-between">
            <button
              class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              <i class="fas fa-edit"></i> تعديل
            </button>
            <button
              @click="handleDelete"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <i class="fas fa-trash-alt"></i> حذف
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- إنشاء تصنيف جديد -->
    <div class="w-full lg:w-4/12 bg-white p-8 rounded shadow-lg mt-0">
      <h2 class="text-2xl font-bold mb-6 text-center">إنشاء تصنيف جديد</h2>
      <form @submit="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium mb-2">الاسم</label>
          <div class="flex items-center border border-gray-300 rounded">
            <i class="fas fa-user text-gray-500 px-3"></i>
            <input
              type="text"
              id="title"
              name="title"
              class="w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل الاسم"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-medium mb-2">الوصف</label>
          <div class="flex items-center border border-gray-300 rounded">
            <i class="fas fa-align-left text-gray-500 px-3"></i>
            <textarea
              id="description"
              name="description"
              class="w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل الوصف"
            ></textarea>
          </div>
        </div>
        <div class="mb-4">
          <label for="date" class="block text-gray-700 font-medium mb-2">تاريخ الإنشاء</label>
          <div class="flex items-center border border-gray-300 rounded">
            <i class="fas fa-calendar-alt text-gray-500 px-3"></i>
            <input
              type="date"
              id="date"
              name="date"
              class="w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="link" class="block text-gray-700 font-medium mb-2">الرابط</label>
          <div class="flex items-center border border-gray-300 rounded">
            <i class="fas fa-link text-gray-500 px-3"></i>
            <input
              type="text"
              id="link"
              name="link"
              class="w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل الرابط"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            إرسال
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  > div {
    background-color: rgb(229 231 235 / 54%);
    border: 1px solid rgb(227, 223, 223);
  }
  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  .animate__animated.animate__fadeOutRight {
    --animate-duration: 1s;
  }
}
</style>
