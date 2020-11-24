import { createApp } from 'vue'
import axios from 'axios'
import router from '@/router'
import store from './store'
import App from './App.vue'
// 配置基本的url
// axios.defaults.baseURL = '/api'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  // 重置错误状态
  store.commit('setError', { status: false, message: '' })
  // 在发送请求之前做些什么
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  // 对响应数据做点什么
  return config
}, e => {
  // 处理错误
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
