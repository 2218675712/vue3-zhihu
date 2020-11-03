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
import { defineComponent, ref } from 'vue'

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
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>

<style scoped>

</style>
