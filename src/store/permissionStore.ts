import { publicRoutes, privateRoutes } from '@/router'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const usePermissionStore = defineStore('permissionStore', {
  state: () => {
    return {
      // 路由表：初始拥有静态路由权限
      routes: publicRoutes,
    }
  },

  actions: {
    /**  根据权限筛选路由 */
    filterRoutes(menus: string[]) {
      const routes: RouteRecordRaw[] = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      /**
       * 最后添加 不匹配路由进入 404
       * 所有不匹配的路由全部进入404
       * 该配置必须在所有路由指定之后
       */
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404',
      })
      // 永远在静态路由的基础上增加新路由
      this.routes = [...publicRoutes, ...routes]
      return routes
    },
  },
})
