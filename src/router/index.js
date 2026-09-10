import { createRouter, createWebHistory } from 'vue-router'
import IndexLayout from '@/layouts/IndexLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import Admin from '@/pages/admin.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: IndexLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Index,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin',
        component: Admin,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'admin' })
  } else {
    next()
  }
})

export default router
