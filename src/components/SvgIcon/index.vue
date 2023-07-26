<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <svg
    v-else
    class="svg-icon"
    :class="className"
    :style="{ color: color }"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { isExternal as external } from '@/utils/validate'
import { computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true,
  },
  // 图标类名
  className: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})

/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `__spritemap#sprite-${props.icon}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}
</style>
