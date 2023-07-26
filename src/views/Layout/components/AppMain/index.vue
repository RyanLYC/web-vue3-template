<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useAppStore } from '@/store/appStore'

const route = useRoute()
/**生成 title */
const getTitle = (route: RouteLocationNormalizedLoaded) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

const appStore = useAppStore()
/**监听路由变化 */
watch(
  route,
  (to: RouteLocationNormalizedLoaded) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    })
  },
  {
    immediate: true,
  }
)
/**
 * 国际化 tags
 */
watchSwitchLang(() => {
  appStore.tagsViewList.forEach((route, index) => {
    const tag = {
      ...route,
      title: getTitle(route),
    }
    appStore.changeTagsView(index, tag)
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 50px - 43px);
  padding: 104px 20px 20px;
  overflow: hidden;
}
</style>
