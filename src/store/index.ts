import { createStore } from 'vuex'
// import {testData, testPosts} from '@/testData'
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
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
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
    }
  },
  getters: {

    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },

    getPostsByCId: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }

  },
  actions: {
    // 用于异步
    fetchColumns (context) {
      axios.get('/api/columns').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    }
  },
  modules: {}
})
