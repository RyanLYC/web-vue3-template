import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'

export const useAppStore = defineStore('appStore', {
  state: () => {
    console.log('appStore')
    return {
      /** 语言 */
      language: 'zh-cn',
      /** 左边栏是否收起 */
      sidebarOpened: false,
      /**主题变量 */
      theme: {
        variables: { ...variables },
      },
      tagsViewList: [] as any[],
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['language', 'tagsViewList'],
      },
    ],
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    /**添加 tags */
    addTagsViewList(tag: any) {
      const isFind = this.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
      }
    },
    /**为指定的 tag 修改 title */
    changeTagsView(index: number, tag: any) {
      this.tagsViewList[index] = tag
    },
    /**
     * 删除 tag
     */
    removeTagsView(payload: {
      index: number
      type: 'index' | 'other' | 'right'
    }) {
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1
        )
        this.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1
        )
      }
    },
  },
})
