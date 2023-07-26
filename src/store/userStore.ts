import { defineStore } from 'pinia'
import router, { resetRouter } from '@/router'
// import { loginByPasswordWithCode, type LoginParamsI } from '@/api/login'
import type { LoginParamsI } from '@/api/login'
import { useAppStore } from './appStore'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      /** 登录的权限信息 */
      token: '',
      /**权限信息 写死吧 实际上接口获取 */
      permission: {
        menus: [] as string[],
        points: [] as string[],
      },
      userInfo: {},
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['token'],
      },
    ],
  },
  actions: {
    /** 登录 */
    login(data: LoginParamsI) {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.token = JSON.stringify(data)
          resolve()
        }, 300)
        // loginByPasswordWithCode(data)
        //   .then((res) => {
        //     if (res.status === 0) {
        //       this.token = res.data.access_token
        //       resolve()
        //     } else {
        //       reject()
        //     }
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
      })
    },
    /** 登出 */
    logout() {
      const appStore = useAppStore()
      appStore.tagsViewList = []
      this.token = ''
      this.userInfo = {}
      resetRouter()
      router.push('/login')
    },
    /**获取用户信息 & 权限 */
    getUserInfo() {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.permission = {
            menus: ['userManage', 'roleList', 'articleRanking'], // 'roleList',
            points: ['removeUser'],
          }
          this.userInfo = { name: 'lyc' }
          resolve()
        }, 300)
      })
    },
    hasUserInfo() {
      return JSON.stringify(this.userInfo) !== '{}'
    },
  },
})
