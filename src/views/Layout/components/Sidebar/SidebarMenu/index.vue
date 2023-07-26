<template>
  <!-- 一级  menu  菜单 -->
  <el-menu
    :collapse="appStore.sidebarOpened"
    :collapse-transition="true"
    :default-active="activeMenu"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from '../SidebarItem/index.vue'
import { useAppStore } from '@/store/appStore'
// import variables from '@/styles/variables.module.scss'

const appStore = useAppStore()
const variables = computed(() => {
  return appStore.theme.variables
})

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(routes.value)

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
