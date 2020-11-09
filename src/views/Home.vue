<template>
  <div class="home-page">
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default {
  name: 'Home',
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    return {
      list
    }
  },
  components: {
    ColumnList
  }
}
</script>

<style scoped>

</style>
