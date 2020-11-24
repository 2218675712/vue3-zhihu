import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
import store from '@/store/index'
import axios from 'axios'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      redirectAlreadyLogin: true
    }
  }, {
    path: '/signup',
    name: 'signup',
    component: Signup
  }, {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail
  }, {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  // 没有登录
  if (!user.isLogin) {
    // 有token
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(error => {
        // 说明token失效
        console.log(error)
        store.commit('logout')
        next('login')
      })
    } else {
      // 没有token
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    // 已经登录
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
