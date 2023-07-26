<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="changeColor()">
              更改颜色值
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout()">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hamburger from '@/components/Hamburger/index.vue'
import { useUserStore } from '@/store/userStore'
import { useAppStore } from '@/store/appStore'
import LangSelect from '@/components/LangSelect/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Guide from '@/components/Guide/index.vue'

const userStore = useUserStore()
const appStore = useAppStore()
const logout = () => {
  userStore.logout()
}
const changeColor = () => {
  // 测试 换色
  appStore.theme.variables.menuBg = '#0088ff'
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;

    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgb(0 0 0 / 10%);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 10px;

    .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        .el-avatar {
          --el-avatar-background-color: none;

          margin-right: 12px;
        }
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
@/store/userStore
