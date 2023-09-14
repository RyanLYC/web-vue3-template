import { render, type VNode } from 'vue'

/**
 *  传送门--将VNode实例化并且渲染到指定节点里面,注意: 需要手动销毁或在onBeforeUnmount里销毁
 * @param vnode 虚拟节点
 * @param selectors 选择器或DOM
 * @returns  destroy 用于销毁当前组件的方法,销毁后vnode可以再次使用
 */
export const teleport = (vnode: VNode, selectors: string | Element) => {
  let container: Element | null
  // 清空函数
  const destroy = () => {
    // 清空节点,会触发绑定当前DOM的组件生命周期,解除绑定
    container && render(null, container)
    // 从vnode上清空el属性,为识别已清空
    vnode.el = null
  }
  // 如果是字串则认为是选择器
  if (typeof selectors === 'string') {
    container = document.querySelector(selectors)
  } else {
    container = selectors as Element
  }
  if (!container) {
    throw new Error(`选择器${selectors}未找到对应节点请确认当前时机已被渲染`)
  }
  // 清空当前DOM,让已绑定此DOM的组件触发生命周期销毁掉
  render(null, container)
  // 将vnode绑定DOM
  render(vnode, container)
  return destroy
}
