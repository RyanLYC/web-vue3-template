<template>
  <div>
    <div>
      {{ $t('profile.name') }}
    </div>
    <div class="test">
      {{ $t('profile.job') }}
    </div>
    <div>
      <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      />
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
    </div>
    <el-button type="primary" v-permission="['removeUser - 0']">
      权限控制的按钮0
    </el-button>
    <el-button type="primary" v-permission="['removeUser']">
      权限控制的按钮
    </el-button>
    <el-button type="primary" v-permission="['removeUser']" @click="handleOpen">
      打开teleport
    </el-button>
    <el-button
      type="primary"
      v-permission="['removeUser']"
      @click="handleClose"
    >
      关闭teleport
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTeleport } from '@/hooks/useTeleport'
// import Test from './components/Test/index.vue'
import Dialog from './components/Dialog/index.vue'

const currentPage1 = ref(5)
const value1 = ref('')

// const { teleport, destroy } = useTeleport(Test)
const { teleport } = useTeleport(Dialog)

const handleOpen = () => {
  // 挂载到指定DOM内, 可以是 字串 或 Element 默认body
  // teleport('.test')
  teleport()
}
const handleClose = () => {
  //调用destroy方法销毁掉
  // destroy()
}
</script>

<!-- <style lang="scss" scoped></style> -->
