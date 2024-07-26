<script setup>
import { ref, onMounted } from 'vue'

let search = ref(false)
onMounted(() => {
  // استخدم Media Query لاكتشاف الأجهزة
  if (window.matchMedia('(min-width: 1024px)').matches) {
    search.value = true
  }
})
</script>
<template>
  <header class="w-full h-20 shadow-md dash-nav relative">
    <div class="flex justify-between h-full items-center px-4 lg:px-4 relative">
      <h1 class="w-1/3 lg:w-1/6">
        <router-link to="/dashboard"> لوحة تحكم</router-link>
      </h1>
      <div
        class="flex flex-col-reverse self-center lg:mx-32 lg:flex-row lg:gap-36 items-center lg:w-4/5"
      >
        <div
          v-if="search == true"
          class="w-full lg:w-3/4 absolute right-0 top-20 lg:top-0 lg:relative search overflow-x-hidden lg:overflow-x-visible"
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="ابحث هنا عن ما تريد ..."
            class="shadow-md p-4 w-full mx-auto lg:w-full focus:scale-105 transition"
          />
          <font-awesome-icon icon="magnifying-glass" class="absolute top-1" />
        </div>
        <nav class="w-full lg:w-1/4 items-center">
          <div class="flex gap-4 justify-center items-center icons">
            <div
              class="p-2 rounded cursor-pointer shadow-md hover:scale-110 w-10 bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              <font-awesome-icon icon="moon" class="text-gray-600 text-lg w-full m-auto" />
            </div>
            <div
              class="hidden lg:inline-block p-2 rounded cursor-pointer shadow-md hover:scale-110 w-10 bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              <font-awesome-icon icon="envelope" class="text-gray-600 text-lg w-full m-auto" />
            </div>
            <div
              class="p-2 rounded hidden lg:inline-block cursor-pointer shadow-md hover:scale-110 w-10 bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              <font-awesome-icon icon="list-check" class="text-gray-600 text-lg w-full m-auto" />
            </div>
            <div
              class="p-2 rounded cursor-pointer shadow-md hover:scale-110 w-10 bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              <font-awesome-icon icon="user" class="text-gray-600 text-lg w-full m-auto" />
            </div>
            <div
              @click="search = !search"
              class="p-2 lg:hidden rounded cursor-pointer shadow-md hover:scale-110 w-10 bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              <font-awesome-icon
                icon="magnifying-glass"
                class="text-gray-600 text-lg w-full m-auto"
              />
            </div>
          </div>

          <div class="absolute content">
            <!-- محتوى سأضيفه لاحقا -->
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
