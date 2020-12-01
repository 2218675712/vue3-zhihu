import { ActionPayload, Commit, createStore } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  // 不知道有没有
  fitUrl?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps|string;
  createdAt?: string;
  column: string;
  author?: string|UserProps;
  isHTML?: false;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

/**
 * 获取并向mutations提交get数据
 * @param url 链接url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 */
const asyncGetAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
/**
 * 向mutations提交post数据
 * @param url 链接url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 * @param payload 请求参数
 */
const asyncPostAndCommit = async (url: string, mutationName: string, commit: Commit, payload: ActionPayload) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
/**
 * 向mutations提交自定义请求方式数据
 * @param url 请求url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 * @param config  请求参数类型
 */
const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}
export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state, rawData) {
      const { token } = rawData.data
      state.token = rawData.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchPostUser (state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    fetchPost (state, rawData) {
      state.posts = [rawData.data]
    },
    updatePost (state, { data }) {
      state.posts = state.posts.map(post => {
        if (post._id === data._id) {
          return data
        } else {
          return post
        }
      })
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    deletePost (state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    }
  },
  getters: {

    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },

    getPostsByCId: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.find(post => post._id === id)
    }
  },
  // 用于异步
  actions: {
    fetchColumns ({ commit }) {
      return asyncGetAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return asyncGetAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return asyncGetAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchPost ({ commit }, id) {
      return asyncGetAndCommit(`/api/posts/${id}`, 'fetchPost', commit)
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/api/posts/${id}`, 'updatePost', commit, {
        // patch是更新
        method: 'patch',
        data: payload
      })
    },
    fetchCurrentUser ({ commit }) {
      return asyncGetAndCommit('/api/user/current', 'fetchPostUser', commit)
    },
    login ({ commit }, payload) {
      return asyncPostAndCommit('/api/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost ({ commit }, payload) {
      return asyncPostAndCommit('/api/posts', 'createPost', commit, payload)
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/api/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    }
  },
  modules: {}
})
