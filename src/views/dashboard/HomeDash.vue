<script setup>
import dashSide from '../../components/dashboardSidebar.vue'
import dashNav from '../../components/dashNav.vue'
</script>
<template>
  <div class="h-screen">
    <dash-nav />
    <div class="flex gap-3">
      <dash-side />
      <Router-view />
    </div>
  </div>
</template>
