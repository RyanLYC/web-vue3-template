<template>
  <div
    class="app-wrapper"
    :class="[!appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: appStore.theme.variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 的navbar -->
        <navbar />
        <!-- tags -->
        <tags-view id="guide-tags"></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin';
@import '@/styles/variables.module';

.app-wrapper {
  @include clearfix;

  position: relative;
  width: 100%;
  height: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
