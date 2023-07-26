<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { type SearchOption, generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
console.log('searchPool:', searchPool.value)
/**
 * 搜索库相关
 */
let fuse: Fuse<SearchOption>
const search = ref('')
/**搜索结果 */
const searchOptions = ref<{ item: SearchOption }[]>([])
/**控制 search 显示 */
const isShow = ref(false)
const headerSearchSelectRef = ref<HTMLElement>()
const onShowClick = () => {
  isShow.value = !isShow.value
  if (headerSearchSelectRef.value) {
    headerSearchSelectRef.value.focus()
  }
}
const initFuse = (searchPool: SearchOption[]) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  })
}
initFuse(searchPool.value)
/**搜索方法 */
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = (value: SearchOption) => {
  router.push(value.path)
}
/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  if (headerSearchSelectRef.value) {
    headerSearchSelectRef.value.blur()
  }
  isShow.value = false
  searchOptions.value = []
}
/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
/** 处理国际化 */
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>
<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
  .header-search-select {
    display: inline-block;
    width: 0;
    overflow: hidden;
    font-size: 18px;
    vertical-align: middle;
    background: transparent;
    border-radius: 0;
    transition: width 0.2s;

    :deep(.el-input__inner) {
      padding-right: 0;
      padding-left: 0;
      vertical-align: middle;
      border: 0;
      border-bottom: 1px solid #d9d9d9;
      border-radius: 0;
      box-shadow: none !important;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
