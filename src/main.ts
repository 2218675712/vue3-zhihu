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
  // 在发送请求之前做些什么
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  // 对响应数据做点什么
  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
