<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      />
      <h1 class="logo-title" v-if="!appStore.sidebarOpened">模版项目</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarMenu from './SidebarMenu/index.vue'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('logoHeight') + 'px';
  padding: 10px 0 22px;
  .logo-title {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
    white-space: nowrap;
  }
  .el-avatar {
    --el-avatar-bg-color: none;
  }
}
</style>
