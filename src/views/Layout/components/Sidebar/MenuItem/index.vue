<template>
  <el-icon v-if="icon.includes('el-icon')" class="sub-el-icon">
    <component :is="icon"
  /></el-icon>

  <svg-icon v-else :name="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script lang="ts" setup>
import { generateTitle } from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<!-- <style lang="scss" scoped></style> -->
