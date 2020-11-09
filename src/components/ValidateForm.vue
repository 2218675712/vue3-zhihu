<template>
  <form class="validate-form-container">
      <!--    default加载默认的内容 除了template里面的-->
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    // 定义一个函数
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 执行validateInput传递过来的函数,查看是否满足条件
      const result = funcArr.map(func => func()).every(result => result)
      // 向app.vue抛出结果
      context.emit('form-submit', result)
    }
    // 将如果验证通过每个框验证结果添加到数组
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style scoped>

</style>
