import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/HomeDash.vue'),
      children: [
        {
          name: 'main dash',
          path: '',
          component: () => import('../views/dashboard/mainDash.vue')
        },
        {
          name: 'articles list',
          path: 'my-articles',
          component: () => import('../views/dashboard/articlesList.vue')
        },
        {
          name: 'new article',
          path: 'new-article',
          component: () => import('../views/dashboard/newArticle.vue')
        },
        {
          name: 'categories',
          path: 'categories',
          component: () => import('../views/dashboard/categoryDash.vue')
        },
        {
          name: 'comments',
          path: 'comments',
          component: () => import('../views/dashboard/commentsList.vue')
        }
      ]
    }
  ]
})

export default router
