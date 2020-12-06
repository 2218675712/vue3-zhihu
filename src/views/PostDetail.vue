<template>
  <div class="post-detail-page">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible=false"
      @modal-on-confirm="hideAndDelete"
      >
      <p>确定是否删除这篇文章吗?</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML">
      </div>
      <div v-if="showEditArea">
        <router-link
          type="button"
          class="btn btn-primary mx-2"
          :to="{name:'create',query:{id:currentPost._id}}">编辑
        </router-link>
        <button type="button" class="btn btn-danger mx-2" @click.prevent="modalIsVisible=true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { GlobalDataProps, ImageProps, PostProps, UserProps, ResponseType } from '@/store'
import UserProfile from '@/components/UserProfile.vue'
import Modal from '@/components/Modal.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'PostDetail',
  components: { Modal, UserProfile },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
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
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功,2秒跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          // 应该使用第一行
          // router.push({ name: 'column', params: { id: rawData.data.column } })
          router.push({ name: 'column', params: { id: rawData.data.column || '' } })
        }, 2000)
      })
    }
    return {
      currentPost,
      showEditArea,
      currentImageUrl,
      currentHTML,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>

<style scoped>

</style>
