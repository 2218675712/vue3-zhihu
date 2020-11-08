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
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '@/hooks/useClickOutSide'

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
    const dropdownRef = ref<null | HTMLElement>(null)
    /**
     * 切换下拉框
     */
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    /**
     * 处理点击事件
     * 点击外面自动关闭下拉框
     */
    const isClickOutside = useClickOutSide(dropdownRef)

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
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
