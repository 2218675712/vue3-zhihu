<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author"></user-profile>
        </div>
          <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML">
      </div>
<!--      <div class="btn-group mt-5">-->
      <div v-if="showEditArea">
        <router-link type="button" class="btn btn-primary mx-2" to="/">编辑</router-link>
        <button type="button" class="btn btn-danger mx-2" >删除</button>
      </div>
<!--      </div>-->
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { computed, defineComponent, onMounted } from 'vue'
import { GlobalDataProps, ImageProps, PostProps, UserProps } from '@/store'
import UserProfile from '@/components/UserProfile.vue'

export default defineComponent({
  name: 'PostDetail',
  components: { UserProfile },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      // getCurrentPost()
      store.dispatch('fetchPost', currentId)
    })
    // const currentPost = computed<PostProps>(() => store.getters.getCurrentPost)
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && currentPost.value.content) {
        return isHTML ? content : md.render(currentPost.value.content)
      }
    })
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })

    return {
      currentPost,
      showEditArea,
      currentImageUrl,
      currentHTML
    }
  }
})
</script>

<style scoped>

</style>
