<template>
  <div class="login-page mx-auto p-3 w-330">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱"
          ref="inputRef"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
          ref="inputRef"></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { ref } from 'vue'
export default {
  name: 'Login',

  setup () {
    const inputRef = ref<any>()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱地址' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '只能由数字，字母组成，不能有特殊符号,并且长度限制在8-12位' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log(inputRef.value.validateInput())
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  },
  components: {
    ValidateForm,
    ValidateInput
  }
}
</script>

<style scoped>

</style>
