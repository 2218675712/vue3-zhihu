<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
       data-toggle="dropdown" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{display:'block'}" aria-labelledby="dropdownMenuLink" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // 定义下拉标签
    const dropdownRef = ref<null|HTMLElement>(null)
    /**
     * 切换下拉框
     */
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    /**
     * 处理点击事件
     * 点击下面自动关闭下拉框
     * @param e Element标签
     */
    const handler = (e: MouseEvent) => {
      // 判断是否有值
      if (dropdownRef.value) {
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      // 监听点击事件调用下拉框处理函数
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style scoped>

</style>
