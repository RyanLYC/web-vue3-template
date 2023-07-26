<template>
  <div class="">
    <div>
      {{ $t('profile.name') }}
    </div>
    <div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage1 = ref(5)
const value1 = ref('')
</script>

<!-- <style lang="scss" scoped></style> -->
