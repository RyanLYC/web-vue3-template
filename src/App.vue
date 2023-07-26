<template>
  <el-config-provider :locale="locale"> <router-view /></el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
// @ts-ignore
import ElementZhCn from 'element-plus/dist/locale/zh-cn.mjs'
// @ts-ignore
import ElementEn from 'element-plus/dist/locale/en.mjs'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
const language = computed(() => appStore.language)
const locale = computed(() => {
  switch (language.value) {
    case 'zh-cn':
      return ElementZhCn
    case 'en':
      return ElementEn
    default:
      return ElementZhCn
  }
})
</script>
