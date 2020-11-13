import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
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
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

/**
 * 获取并向mutations提交数据
 * @param url 链接url
 * @param mutationName  mutation函数名
 * @param commit  提交类型
 */
const getAndcommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
export default createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: true,
      name: '彼岸',
      columnId: 1
    }
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: '彼岸'
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
      getAndcommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndcommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPost ({ commit }, cid) {
      getAndcommit(`/api/columns/${cid}/posts`, 'fetchPost', commit)
    }
  },
  modules: {}
})
