<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <ColumnList :list="list"></ColumnList>
    {{biggerColumnLen}}
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
    const biggerColumnLen = computed(() => store.getters.biggerColumnLen)
    return {
      list,
      biggerColumnLen
    }
  },
  components: {
    ColumnList
  }
}
</script>

<style scoped>

</style>
