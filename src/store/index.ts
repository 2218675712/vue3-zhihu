import { createStore, Commit, ActionPayload } from 'vuex'
import axios from 'axios'

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface GlobalDataProps {
  token: string;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

/**
 * 获取并向mutations提交get数据
 * @param url 链接url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 */
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
/**
 * 向mutations提交post数据
 * @param url 链接url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 * @param payload 请求参数
 */
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: ActionPayload) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
export default createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    /*
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: '彼岸'
      }
    },

     */
    login (state, rawData) {
      const { token } = rawData.data
      state.token = rawData.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchPostUser (state, rawData) {
      console.log(rawData)
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
    fetchPost (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  getters: {

    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },

    getPostsByCId: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }

  },
  // 用于异步
  actions: {
    fetchColumns ({ commit }) {
      /*
      const { data } = await axios.get('/api/columns')
      commit('fetchColumns', data)
      */
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPost ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPost', commit)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/api/user/current', 'fetchPostUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  modules: {}
})
