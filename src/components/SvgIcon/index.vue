<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :width="props.size"
    :height="props.size"
  >
    <defs>
      <linearGradient :id="linearGradientId" v-bind="direction" ref="gradient">
        <stop offset="0%" :stop-color="props.color"></stop>
        <stop offset="100%" :stop-color="props.gradientColor"></stop>
      </linearGradient>
    </defs>
    <use :xlink:href="symbolId" :fill="svgFill" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#666',
  },
  size: {
    type: String,
    default: '1em',
  },
  gradientColor: {
    type: String,
    default: '',
  },
  gradientAngle: {
    type: String,
    default: '1',
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const linearGradientId = computed(
  () => `gradient-${props.prefix}-${props.name}`
)
const svgFill = computed(() => {
  if (props.gradientColor) {
    return `url(#${linearGradientId.value})`
  }
  return props.color
})
const direction = computed(() => {
  switch (props.gradientAngle) {
    case '1':
      return { x1: '0%', x2: '100%', y1: '0%', y2: '0%' }
    case '2':
      return { x1: '0%', x2: '100%', y1: '100%', y2: '0%' }
    case '3':
      return { x1: '0%', x2: '0%', y1: '100%', y2: '0%' }
    case '4':
      return { x1: '100%', x2: '0%', y1: '100%', y2: '0%' }
    case '5':
      return { x1: '100%', x2: '0%', y1: '0%', y2: '0%' }
    case '6':
      return { x1: '0%', x2: '100%', y1: '0%', y2: '100%' }
    case '7':
      return { x1: '0%', x2: '0%', y1: '0%', y2: '100%' }
    case '8':
      return { x1: '100%', x2: '0%', y1: '0%', y2: '100%' }
    default:
      return { x1: '0%', x2: '100%', y1: '0%', y2: '0%' }
  }
})
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
}
.svgFill {
  /* url('#gradient'); */
  fill: v-bind('svgFill');
}
</style>
