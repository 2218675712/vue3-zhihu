import { onUnmounted } from 'vue'

/**
 * 创建DOM节点
 * @param nodeId
 */
function useDOMCreate (nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
export default useDOMCreate
