## vue3 企业级项目模板

1. element-plus
2. vue-router
3. axios
4. Pinia
5. 本地svg icon - 'vite-plugin-svg-icons'  支持渐变色
6. vue-i18n 支持多语言
7. keep-alive
8. 功能引导页  -   "driver.js": "^1.1.0",
9. 路由搜索  -  "fuse.js": "^6.6.2",
10. 全屏 -  "screenfull": "^6.0.2",
11. 权限管理 - 权限 - 角色 - 用户
12. 权限 指令 控制组件是否显示
13. useTeleport  将内容挂在在其他地方展示如：弹窗

## 项目运行

    - 安装依赖
        ```
        yarn install
        ```
    - 启动项目
        ```
        yarn dev
        ```
    - 打包项目
        ```
        yarn build

### [纯净版本](https://github.com/RyanLYC/vue3-template)

### 换肤 - [参考](https://github.com/RyanLYC/RyanLYC/blob/main/CSS/%E5%89%8D%E7%AB%AF%E4%B8%BB%E9%A2%98%E5%88%87%E6%8D%A2%E6%96%B9%E6%A1%88%E8%AF%A6%E8%A7%A3.md)

1. 方案一 - 项目中使用  variables.module.scss 中 的 :export 把sass变量导出，然后存放在appStore的变量中，换肤就是更改值即可。
2. 方案二 - 自定义好皮肤更换
```css
/* 默认皮肤 */
.base {
  --menuBg: #fff;
  --menuTextColor: #586686;
  --menuActiveTextColor: #586686;
  --menuHorizontalHoverBg: linear-gradient(360deg, #fdfeff 0%, #d0e9ff 100%);
  --menuHoverBg: #1394ff;
}
/* 黑色皮肤 */
.black {
  --menuBg: black;
  --menuTextColor: #fff;
  --menuActiveTextColor: #ffd04b;
  --menuHorizontalHoverBg: #666;
  --menuHoverBg: #ccc;
}
```
```css
.test{
 background: var(--menuHoverBg);
}

```
```js
    const htmlElement: any = document.querySelector('html')
    htmlElement.setAttribute(
      'class',
      localStorage.getItem('style') || 'base'
    )
```
```html
 <el-menu
      :default-active="currentRoutePath"
      background-color="var(--menuBg)"
      text-color="var(--menuTextColor)"
      active-text-color="var(--menuActiveTextColor)"
    ></el-menu>
```

#### Element-plus 换色
```json 
// formula.json
{
  "shade-1": "color(primary shade(10%))",
  "light-1": "color(primary tint(10%))",
  "light-2": "color(primary tint(20%))",
  "light-3": "color(primary tint(30%))",
  "light-4": "color(primary tint(40%))",
  "light-5": "color(primary tint(50%))",
  "light-6": "color(primary tint(60%))",
  "light-7": "color(primary tint(70%))",
  "light-8": "color(primary tint(80%))",
  "light-9": "color(primary tint(90%))",
  "subMenuHover": "color(primary tint(70%))",
  "subMenuBg": "color(primary tint(80%))",
  "menuHover": "color(primary tint(90%))",
  "menuBg": "color(primary)"
}
```
```js
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'
/**
 * 写入新样式到 style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async (primaryColor) => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // console.log('colors', colors)
  // 2. 获取当前 element-plus 的默认样式，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3.遍历生成的色值表，在默认样式进行全局替换
  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

/**
 * 根据主色生成色值表
 */
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表
 */
export const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 * 返回 style 的 template
 */
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

```
