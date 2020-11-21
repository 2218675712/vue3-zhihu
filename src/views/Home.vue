<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <ColumnList :list="list"></ColumnList>
    <uploader
      action="/api/upload"
      :before-upload="beforeUpload"
      @file-uploaded="onFileUploaded"
      @file-uploaded-error="onFileUploadedError">
      <template #success="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps, ResponseType } from '@/store'
import Uploader from '@/views/Uploader.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    // 判断图片是否是指定的类型
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      console.log(file.type)
      if (!isJPG) {
        createMessage('上传图片只能是jpeg格式', 'error')
      }
      return isJPG
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片id${rawData.data._id}`, 'success')
    }
    const onFileUploadedError = (error: { error: { message: string } }) => {
      createMessage(`发生错误,错误信息:${error.error.message}`, 'error')
    }
    return {
      list,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  },
  components: {
    Uploader,
    ColumnList
  }
})
</script>

<style scoped>

</style>
