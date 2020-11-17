import { onMounted, onUnmounted, Ref, ref } from 'vue'

/**
 * 判断点击内外事件
 * @param elementRef
 */
const useClickOutSide = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    // 判断是否有值
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        // 当我点击不包括我里面节点的时候
        isClickOutside.value = true
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

  return isClickOutside
}
export default useClickOutSide
