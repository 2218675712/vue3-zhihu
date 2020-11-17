import Message from '@/components/Message.vue'
import { createApp } from 'vue'

export type MessageType = 'success' | 'error' | 'default'
/**
 * 创建函数调用直接创建组件
 * @param message 提示信息
 * @param type  类型
 * @param timeout 持续时间
 */
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // 创建一个组件
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  // 挂载到节点上
  messageInstance.mount(mountNode)
  setTimeout(() => {
    // 卸载组件
    messageInstance.unmount(mountNode)
    // 删除节点
    document.body.removeChild(mountNode)
  }, timeout)
}
export default createMessage
