<template>
  <div class="w-full lg:w-2/3 mx-auto bg-white p-8 rounded shadow-xl">
    <h2 class="text-2xl font-bold mb-6 text-center">التعليقات</h2>

    <!-- قائمة التعليقات -->
    <div class="space-y-4">
      <div class="bg-gray-100 p-4 rounded shadow-md comment transition-all duration-300">
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <i class="fas fa-user text-blue-500 ml-2"></i>
            <span class="font-bold">اسم المستخدم</span>
          </div>
          <button
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <i class="fas fa-trash-alt"></i> حذف
          </button>
        </div>
        <p class="text-gray-600 mb-2">user@example.com</p>
        <p class="text-gray-700 mb-2">
          هذا هو نص التعليق. يمكن أن يكون التعليق طويل أو قصير حسب ما يكتبه المستخدم.
        </p>
        <div class="text-gray-500 text-sm">
          <i class="fas fa-clock ml-1"></i> تم التعليق في 18/10/2005
        </div>
      </div>

      <!-- يمكن إضافة المزيد من التعليقات هنا -->
    </div>
  </div>
</template>
<style>
.comment:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
}
</style>
