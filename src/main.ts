import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersist from 'pinia-plugin-persist'
import i18n from '@/i18n'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// 导入重置样式
import './styles/reset.css'
// 导入全局样式
import './styles/index.scss'
// 全局导入SvgIcon
import SvgIcon from '@/components/SvgIcon/index.vue'
import { toLine } from './utils'
// 指令
import installDirective from '@/directives'

console.log(import.meta.env.VITE_BASE_URL)

const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)
installDirective(app)

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${toLine(key)}`, component)
}

app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
