<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { articleStore } from '@/stores/articles'
import { categoryStore } from '@/stores/categories'

const router = useRouter()
const store = articleStore()

const submitted = ref(false)
const validateErrors = ref({
  title: false,
  link: false,
  file: false
})

const categories = ref([])

const validateForm = async (data) => {
  // validate link
  await store.getAllPosts()
  let links = store.allArticles.map((el) => el.link)
  let checkLink = links.some((el) => el === data.get('link'))
  if (checkLink) {
    validateErrors.value.link = true
    throw 'الرابط مستخدم من قبل'
  }

  // validate feature image
  const file = data.get('receipt')
  if (file && !file.type.startsWith('image/')) {
    validateErrors.value.file = true
    throw 'يرجى رفع صورة فقط في حقل الصورة المميزة'
  }
}

const submitForm = async (event) => {
  event.preventDefault() // منع التقديم الافتراضي للنموذج

  const formElement = event.target
  const formData = new FormData(formElement)

  try {
    await validateForm(formData)
    await axios.post('http://localhost:3000/posts/newPost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    submitted.value = true
    setTimeout(() => {
      router.push('my-articles')
    }, 2000)
  } catch (error) {
    console.error('Error:', error)
    // يمكنك إضافة كود هنا للتعامل مع الأخطاء
  }
}

const categoryList = async () => {
  const cats = await categoryStore().getAllCategories()
  categories.value = JSON.parse(cats)
}

onMounted(() => {
  categoryList()
})
</script>

<template>
  <div class="p-3 lg:p-6 w-full mx-4 my-2 bg-slate-50 rounded-lg shadow-md article-edit">
    <h2 class="text-3xl font-bold mb-5 text-center my-2">إنشاء مقال جديد</h2>
    <form @submit="submitForm" class="lg:space-y-6">
      <div class="flex gap-4 flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-3/4 border-2 border-gray-200 p-6 shadow-md rounded-lg">
          <fieldset class="space-y-4">
            <legend class="text-xl font-semibold">معلومات المقال</legend>

            <div class="flex flex-col space-y-2">
              <label for="title" class="font-medium">العنوان :</label>
              <input type="text" name="title" id="title" class="input-style" required />
            </div>

            <div class="flex flex-col space-y-2">
              <label for="link" class="font-medium">الرابط :</label>
              <input
                type="text"
                name="link"
                id="link"
                placeholder="ex: book-article-new"
                class="input-style"
              />
              <p v-if="validateErrors.link === true" class="error-text">
                الرابط غير صالح او مستخدم من قبل
              </p>
            </div>

            <div class="flex flex-col space-y-2">
              <label for="category" class="font-medium">التصنيف :</label>
              <select name="category" id="category" class="input-style">
                <option
                  v-for="category in categories"
                  :key="category._id"
                  name="category"
                  :value="category._id"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>
          </fieldset>
          <br />
          <fieldset class="space-y-4">
            <legend class="text-xl font-semibold">المحتوى</legend>

            <div class="flex flex-col space-y-2">
              <label for="content" class="font-medium">محتوى المقال :</label>
              <textarea
                name="content"
                id="content"
                rows="4"
                class="input-style"
                minlength="50"
                required
              ></textarea>
            </div>

            <div class="flex flex-col space-y-2">
              <label for="summary" class="font-medium">ملخص المقال :</label>
              <textarea
                name="summary"
                id="summary"
                rows="4"
                class="input-style"
                minlength="20"
                maxlength="200"
              ></textarea>
            </div>
          </fieldset>
        </div>
        <div class="w-full lg:w-1/4 border-2 border-gray-200 p-6 shadow-md rounded-lg bg-white">
          <fieldset>
            <legend class="text-lg font-semibold text-gray-900 mb-4">معلومات اضافية</legend>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700">تاريخ المقال</label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div class="mb-4">
              <label for="featureImage" class="block text-sm font-medium text-gray-700"
                >الصورة المميزة</label
              >
              <div class="mt-1 flex items-center">
                <input
                  accept="image/*"
                  type="file"
                  name="receipt"
                  id="receipt"
                  class="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                />
              </div>
              <p v-if="validateErrors.file" class="error-text">يرجى ادخال الصيغة الصحيحة للصور</p>
            </div>

            <div class="flex items-center mb-4">
              <input
                type="checkbox"
                checked
                name="comments"
                id="comments"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="comments" class="ml-2 block text-sm text-gray-700"
                >السماح بالتعليقات</label
              >
            </div>
          </fieldset>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <input
          v-if="!submitted"
          type="submit"
          value="إنشاء مقال"
          class="bg-blue-500 w-1/2 text-white font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          v-else
          class="bg-green-500 w-1/2 text-white font-semibold py-2 px-4 rounded-md animate-bounce"
        >
          تم الارسال بنجاح
        </button>
      </div>
    </form>
  </div>
</template>
