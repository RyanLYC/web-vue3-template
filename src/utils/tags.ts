import { whiteList } from '@/router'

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export function isTags(path: string) {
  return !whiteList.includes(path)
}
