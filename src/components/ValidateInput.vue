<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag!=='textarea'"
      class="form-control"
      :class="{'is-invalid':inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"/>
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid':inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
      rows="10"></textarea>
    <!--    使用 v-bind 缩写来完成将所有非 prop attribute 应用于 input 元素而不是根 div 元素-->
    <span
      v-if="inputRef.error"
      class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, watch } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/

interface RuleProp {
  type: 'required' | 'email' | 'password'|'custom';
  message: string;
  validator?: () => boolean;
}

export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // 禁用 Attribute 继承
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      // 获取父组件传递的默认值
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      // 判断规则是否为空
      if (props.rules) {
        // 遍历所有规则
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = passwordReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      // 向上面组件传递
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>

</style>
