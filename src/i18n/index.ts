import { createI18n } from 'vue-i18n'
import { profileZh, profileEn } from '@/views/Profile/lang'

const messages = {
  zh: {
    navBar: {
      lang: '国际化',
      guide: '功能引导',
    },
    toast: {
      switchLangSuccess: '切换语言成功',
    },
    route: {
      profile: '个人中心',
      user: '用户',
      userManage: '员工管理',
      userInfo: '员工信息',
      roleList: '角色列表',
      article: '文章',
      articleRanking: '文章排名',
      articleDetail: '文章详情',
    },
    tagsView: {
      refresh: '刷新',
      closeRight: '关闭右侧',
      closeOther: '关闭其他',
    },
    ...profileZh,
  },
  en: {
    toast: {
      navBar: {
        lang: 'Globalization',
        guide: 'Function Guide',
      },
      switchLangSuccess: 'Switch Language Success',
    },
    route: {
      profile: 'Profile',
      user: 'user',
      userManage: 'EmployeeManage',
      userInfo: 'UserInfo',
      roleList: 'RoleList',
      article: 'article',
      articleRanking: 'ArticleRanking',
      articleDetail: 'ArticleDetail',
    },
    tagsView: {
      refresh: 'Refresh',
      closeRight: 'Close Rights',
      closeOther: 'Close Others',
    },
    ...profileEn,
  },
}

/**
 * 返回当前 lang
 */
function getLanguage() {
  // appStore: 	{"language":"en"}
  const appStoreStr =
    sessionStorage.getItem('appStore') || localStorage.getItem('appStore')
  if (appStoreStr) {
    const appStore = JSON.parse(appStoreStr)
    return appStore.language
  }
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage() || 'zh-cn',
  messages,
})

export default i18n
