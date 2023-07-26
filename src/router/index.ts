import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import ArticleRouter from './modules/Article'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import { generateTitle } from '@/utils/i18n'
import { useUserStore } from '@/store/userStore'
import { usePermissionStore } from '@/store/permissionStore'

/**
 * 私有路由表
 */
export const privateRoutes = [ArticleRouter, RoleListRouter, UserManageRouter]
/**
 * @description: 公开路由表
 */
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/ErrorPage/404.vue'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/ErrorPage/401.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

// 白名单
export const whiteList = ['/login', '/404', '/401']

/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 要从哪里来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问

  if (to.meta.title) {
    const main = '模版'
    const center = ' | '
    const title = to.meta.title
    document.title = generateTitle(title) + center + main
  }
  if (userStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!userStore.hasUserInfo()) {
        // 触发获取用户信息的 action，并获取用户当前权限
        await userStore.getUserInfo()
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await permissionStore.filterRoutes(
          userStore.permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        next(to.path)
      }
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) === -1) {
      next('/login')
    } else {
      next()
    }
  }
})

/**
 * 退出登录重置路由表
 */
export function resetRouter() {
  const userStore = useUserStore()
  if (userStore.permission && userStore.permission.menus) {
    const menus = userStore.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
