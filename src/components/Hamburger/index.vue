<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :name="name"></svg-icon>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
const toggleClick = () => {
  appStore.triggerSidebarOpened()
}

const name = computed(() =>
  appStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
}
</style>
