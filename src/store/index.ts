import { createStore } from 'vuex'
import { ColumnProps, PostProps, testData, testPosts } from '@/testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '彼岸' }
    }
  },
  getters: {
    biggerColumnLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },

    getPostsById: (state) => (cid: number) => {
      return state.posts.find(post => post.columnId === cid)
    }

  },
  actions: {},
  modules: {}
})
