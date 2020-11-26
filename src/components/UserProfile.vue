<template>
  <div class="user-profile-component">
      <div class="d-flex align-items-center">
        <img :src="fitUrl" class="rounded-circle img-thumbnail">
        <div class="detail ml-2">
          <h6 class="d-block mb-0">{{user.nickName }}</h6>
          <span class="text-truncate text-muted d-block">{{ user.description }}</span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserProps } from '@/store'
export default defineComponent({
  name: 'UserProfile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    const fitUrl = computed(() => {
      const { avatar } = props.user
      if (avatar && avatar.url) {
        avatar.fitUrl = avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        return avatar.fitUrl
      }
    })
    return {
      fitUrl
    }
  }

})
</script>

<style scoped>

</style>
