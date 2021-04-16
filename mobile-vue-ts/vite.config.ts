// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js'
  },
  esbuild: {
    jsxInject: `import {h} from 'vue'`,
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
