<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      action="/api/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #success="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
          tag="textarea"
        ></validate-input>
      </div>

      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps } from '@/store'
import Uploader from '@/components/Uploader.vue'

export default defineComponent({
  name: 'CreatePost',
  components: { Uploader, ValidateInput, ValidateForm },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [{
      type: 'required',
      message: '文章标题不能为空'
    }]
    const contentVal = ref('')
    const contentRules: RulesProp = [{
      type: 'required',
      message: '文章详情不能为空'
    }]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column: column.toString(),
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container{
  height: 200px;
  cursor:pointer;
}
.create-post-page .file-upload-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
