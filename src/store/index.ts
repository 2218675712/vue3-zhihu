import { createStore } from 'vuex'
import { ColumnProps, PostProps, testData, testPosts } from '@/testData'
export { ColumnProps, PostProps } from '@/testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export const arrToObj = <T extends { id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current.id) {
      prev[current.id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: '彼岸',
      columnId: 1
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '彼岸' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {

    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },

    getPostsById: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }

  },
  actions: {},
  modules: {}
})
