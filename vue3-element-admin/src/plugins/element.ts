import { App } from 'vue'
import {
  locale,
  ElButton,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElScrollbar,
  ElDrawer,
  ElColorPicker,
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElCard,
  ElTree,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElSelect,
  ElOption
} from 'element-plus'
// 默认主题
// import 'element-plus/lib/theme-chalk/index.css'

// Element Plus 组件内部默认使用英语
// https://element-plus.gitee.io/#/zh-CN/component/i18n
import lang from 'element-plus/lib/locale/lang/zh-cn'
// Element Plus 直接使用了 Day.js 项目的时间日期国际化设置, 并且会自动全局设置已经导入的 Day.js 国际化配置。
import 'dayjs/locale/zh-cn'

// $ELEMENT size属性类型
export type Size = 'default' | 'medium' | 'small' | 'mini'

interface ElementOptions {
  size: Size
}

export default (app: App, options: ElementOptions): void => {
  locale(lang)

  // 按需导入组件列表
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElRow,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTooltip,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElScrollbar,
    ElDrawer,
    ElColorPicker,
    ElSwitch,
    ElForm,
    ElFormItem,
    ElInput,
    ElCard,
    ElTree,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElSelect,
    ElOption
  ]

  components.forEach(component => {
    app.component(component.name, component)
  })

  // Vue.prototype 替换为 config.globalProperties
  // 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt

  // 全局配置 https://element-plus.gitee.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi
  // 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）。
  app.config.globalProperties.$ELEMENT = {
    size: options.size
  }
}
