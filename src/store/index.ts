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
    login (store) {
      store.user = { ...store.user, isLogin: true, name: '彼岸' }
    }
  },
  actions: {},
  modules: {}
})
