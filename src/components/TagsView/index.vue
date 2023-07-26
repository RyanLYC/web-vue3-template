<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag)
            ? appStore.theme.variables.tagViewsList
            : '',
          borderColor: isActive(tag)
            ? appStore.theme.variables.tagViewsList
            : '',
        }"
        v-for="(tag, index) in appStore.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}

        <el-icon-close
          v-show="!isActive(tag)"
          class="el-icon el-icon-close"
          @click.prevent.stop="onCloseClick(index)"
        />
      </router-link>
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script lang="ts" setup>
import ContextMenu from './ContextMenu.vue'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/appStore'

const route = useRoute()
/**
 * 是否被选中
 */
const isActive = (tag: any) => {
  return tag.path === route.path
}

/**
 * 关闭 tag 的点击事件
 */
const appStore = useAppStore()
const onCloseClick = (index: number) => {
  appStore.removeTagsView({
    type: 'index',
    index: index,
  })
}

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: '0',
  top: '0',
})
/**
 * 展示 menu
 */
const openMenu = (e: any, index: number) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  .tags-view-item {
    position: relative;
    display: inline-block;
    height: 26px;
    padding: 0 8px;
    margin-top: 4px;
    margin-left: 5px;
    font-size: 12px;
    line-height: 26px;
    color: #495060;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dce5;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        position: relative;
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 4px;
        content: '';
        background: #fff;
        border-radius: 50%;
      }
    }

    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      text-align: center;
      vertical-align: -4px;
      border-radius: 50%;
      transition: all 0.3s linear;

      &:hover {
        color: #fff;
        background-color: #b4bccc;
      }
    }
  }
}
</style>
