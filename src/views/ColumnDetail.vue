<template>
<div class="column-detail-page w-75 mx-auto">
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar&&column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
  </div>
  <post-list :list="list"></post-list>
</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

import PostList from '@/components/PostList.vue'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ColumnProps, GlobalDataProps } from '@/store'
import { generateFitUrl } from '@/helper'

export default defineComponent({
  name: 'ColumnDetail',
  components: { PostList },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps|undefined
      if (selectColumn) {
        generateFitUrl(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsByCId(currentId))
    return {
      column,
      list
    }
  }
})
</script>

<style scoped>

</style>
