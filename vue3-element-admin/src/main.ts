import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
// 初始化css
import 'normalize.css/normalize.css'
// element-plus
import installElementPlus, { Size } from './plugins/element'
// 挂载到vue实例上
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
// 用户验证
import './permission'
// 全局 css
import '@/styles/index.scss'
// svg icons
import initSvgIcon from '@/icons/index'
// 权限指令
import permissionDirective from './directive/permission/index'

const app = createApp(App)
// 获取store里存储的size
const size = store.state.app.size

app
  .use(store, key)
  .use(router)
  .use(installElementPlus, {
    size
  })
  .use(permissionDirective)
  .use(initSvgIcon)
  .mount('#app')

/**
 * 相关issue问题
 * Why not on the d.ts use it ?
   (为什么不能在shims-d.ts 中设置这个？
 * https://github.com/vuejs/vue-next/pull/982
 */
// 挂载到vue实例上
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size;
    };
  }
}
