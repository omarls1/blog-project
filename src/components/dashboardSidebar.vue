<script setup>
import { ref } from 'vue'

let myAside = ref(null)
let display = ref(true)
let arrowRotate = ref(0)
let showSide = () => {
  if (arrowRotate.value === 180) {
    arrowRotate.value = 0
    myAside.value.classList.add('animate__animated', 'animate__fadeInRightBig')
    display.value = true
  } else {
    arrowRotate.value = 180
    display.value = false
    myAside.value.classList.remove('animate__animated', 'animate__fadeInRightBig')
  }
}
</script>

<template>
  <aside
    class="bg-slate-100 shadow-lg dash-sidebar fixed top-0 lg:relative z-30 animate__faster"
    ref="myAside"
  >
    <div
      @click="showSide"
      class="open-side cursor-pointer absolute left-0 -translate-x-full top-1/2 bg-sky-200 p-4 rounded-md shadow-md"
    >
      <font-awesome-icon icon="arrow-right" :class="`rotate-${arrowRotate}`" />
    </div>
    <div>
      <ul
        v-if="display"
        class="w-[calc(100vw-60px)] lg:w-72 pl-14 flex flex-col divide-y-2 mt-4 divide-slate-200 divide-opacity-70"
      >
        <li>
          <router-link to="/dashboard"
            ><font-awesome-icon :icon="['fas', 'house']" /> الرئيسية</router-link
          >
        </li>
        <li>
          <font-awesome-icon icon="newspaper" /> المقالات
          <ul class="mr-4">
            <li><router-link to="/dashboard/my-articles">عرض المقالات</router-link></li>
            <li>
              <router-link to="/dashboard/new-article">مقال جديد</router-link>
            </li>
          </ul>
        </li>
        <li>
          <font-awesome-icon icon="file" /> الصفحات
          <ul class="mr-4">
            <li><a href="#">عرض الصفحات</a></li>
            <li><a href="#">صفحة جديدة</a></li>
          </ul>
        </li>
        <li>
          <router-link to="/dashboard/categories"
            ><font-awesome-icon icon="layer-group" /> التصنيفات</router-link
          >
        </li>
        <li>
          <router-link to="/dashboard/comments"
            ><font-awesome-icon icon="comments" /> التعليقات</router-link
          >
        </li>
        <li>
          <font-awesome-icon icon="gear" /> الإعدادات
          <ul class="mr-4">
            <li>اعدادت المقالات</li>
            <li>اعدادت الصفحات</li>
            <li>اعدادت التعليقات</li>
            <li>اعدادت عامة</li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>
