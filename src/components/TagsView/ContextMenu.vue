<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/appStore'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
})
const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}

const appStore = useAppStore()
const onCloseRightClick = () => {
  appStore.removeTagsView({
    type: 'right',
    index: props.index,
  })
}

const onCloseOtherClick = () => {
  appStore.removeTagsView({
    type: 'other',
    index: props.index,
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  z-index: 3000;
  padding: 5px 0;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  list-style-type: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
  li {
    padding: 7px 16px;
    margin: 0;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
