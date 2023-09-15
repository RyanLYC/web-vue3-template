<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <svg-icon
        id="guide-start"
        name="guide"
        @click="onClick"
        :color="'#ff0000'"
        :gradientColor="'#00ff00'"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
// import { useI18n } from 'vue-i18n'
import steps from './steps'

// const i18n = useI18n()

const driverObj = driver()
onMounted(() => {
  driverObj.setConfig({
    // 禁止点击蒙版关闭
    allowClose: false,
    doneBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
  })
})
const onClick = () => {
  driverObj.setSteps(steps()) // i18n // Set the steps
  driverObj.drive() // Starts at step 0
}
</script>
