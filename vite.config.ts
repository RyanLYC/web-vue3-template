import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslintPlugin(),
    stylelintPlugin({ fix: true }),
    // VitePluginSVGSpritemap('./src/icons/*.svg'),
    createSvgIconsPlugin({
      // svg所在文件夹位置
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    open: false,
  },
})
