<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" name="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh-cn'" command="zh-cn">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useAppStore } from '@/store/appStore'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value: string) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    },
  },
})

const appStore = useAppStore()
const language = computed(() => appStore.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang: string) => {
  i18n.locale.value = lang
  appStore.language = lang
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>
