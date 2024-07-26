<script setup>
import { articleStore } from '@/stores/articles'
import { onMounted, ref } from 'vue'

const store = articleStore()
const articles = ref([]) // إنشاء متغير تفاعلي لتخزين المقالات

onMounted(async () => {
  await store.getAllPosts()
  articles.value = store.allArticles
})
</script>

<template>
  <div v-if="articles.length > 0" class="articles">
    <router-link
      v-for="article in articles"
      :key="article._id"
      :to="`/dashboard/articles/${article._id}`"
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        :src="`http://localhost:3000/${article.featureImage}`"
        :alt="article.title"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ article.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-700">
          {{ article.summary }}
        </p>
      </div>
    </router-link>
  </div>

  <div
    v-else
    class="bg-pink-100 border-l-4 border-pink-500 text-pink-700 p-6 w-full lg:w-1/2 mt-4 rounded-lg shadow-md h-0 flex items-center"
  >
    <svg
      class="w-6 h-6 mr-2 text-pink-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v3a1 1 0 102 0V7zm-1 6a1 1 0 100 2 1 1 0 000-2z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <h5 class="text-sm font-medium cursor-pointer">لا يوجد مقالات لعرضها</h5>
  </div>
</template>
<style lang="scss" scoped>
.articles {
  .post {
    padding: 50px;
  }
}
</style>
