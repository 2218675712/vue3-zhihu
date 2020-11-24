<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentPost.image.url+'?x-oss-process=image/resize,w_850'" class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
<!--          todo 封装头像组件-->
          <div class="d-flex align-items-center">
            <img :src="currentPost.author.avatar.url" class="rounded-circle img-thumbnail">
            <div class="detail ml-2">
              <h6 class="d-block mb-0">{{ currentPost.author.nickName }}</h6>
              <span class="text-truncate text-muted d-block">{{ currentPost.author.description }}</span>
            </div>
          </div>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentPost.content">
      </div>
      <div class="btn-group mt-5">
        <router-link type="button" class="btn btn-success" to="/">编辑</router-link>
        <button type="button" class="btn btn-danger">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { defineComponent, onMounted, ref } from 'vue'
import { GlobalDataProps } from '@/store'
import axios from 'axios'

export default defineComponent({
  name: 'PostDetail',
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    const md = new MarkdownIt()
    const currentPost = ref(null)
    // todo 还剩存入store
    const getCurrentPost = () => {
      axios.get(`/api/posts/${currentId}`).then(data => {
        currentPost.value = data.data.data
      })
    }
    onMounted(() => {
      getCurrentPost()
    })

    return {
      currentPost
    }
  }
})
</script>

<style scoped>

</style>
