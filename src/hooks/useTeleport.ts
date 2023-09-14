import { createVNode, getCurrentInstance, onBeforeUnmount } from 'vue'
import { teleport } from './teleport'

/**
 * 创建一个组件
 * 注意: 需要手动销毁或在onBeforeUnmount里销毁
 * @param cmp 组件对象或字串模板
 * @param container 选择器或DOM
 * @returns \{ component, teleport， destroy }
 */
export const useTeleport = (cmp: Parameters<typeof createVNode>[0]) => {
  const app = getCurrentInstance()
  if (!app) {
    // 必须在 setup 函数内执行否则  getCurrentInstance 获取不到当前实例
    throw new Error(`必须在 setup 函数内执行`)
  }
  const newCmp = createVNode(cmp)
  newCmp.appContext = app.appContext
  // 销毁回调
  let destroyCallBack: ReturnType<typeof teleport> | null = null
  // 销毁函数
  const destroy = () => destroyCallBack && destroyCallBack()

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    // 创建好的组件实例
    component: newCmp.component,
    // 在需要的地方调用这个方法进行传送
    teleport: (container: string | Element = 'body') => {
      destroyCallBack = teleport(newCmp, container)
      return destroyCallBack
    },
    destroy,
  }
}
