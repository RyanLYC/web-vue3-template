<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter, type RouteLocationMatched } from 'vue-router'
import { generateTitle } from '@/utils/i18n'
import { useAppStore } from '@/store/appStore'

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref<RouteLocationMatched[]>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  console.log(breadcrumbData.value)
}
//监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = (item: RouteLocationMatched) => {
  // console.log(item)
  router.push(item.path)
}

const appStore = useAppStore()
const linkHoverColor = computed(() => {
  return appStore.theme.variables.menuBg
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    font-weight: 600;
    color: #666;
  }

  .redirect:hover {
    color: v-bind('linkHoverColor');
  }
}
</style>
