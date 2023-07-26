import i18n from '@/i18n'
import { watch } from 'vue'
import { useAppStore } from '@/store/appStore'

/**
 * 生成i18n 语言路由 title
 */
export function generateTitle(title: unknown) {
  return i18n.global.t('route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs: any) {
  const appStore = useAppStore()
  watch(
    () => appStore.language,
    () => {
      cbs.forEach((cb: any) => cb(appStore.language))
    }
  )
}
