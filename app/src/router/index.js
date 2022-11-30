import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { resolveAuth } from './resolveAuth'

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  resolveAuth(to, next, store)
})

export default router
