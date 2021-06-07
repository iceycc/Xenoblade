import { computed } from 'vue'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/getStyleTemplate'
import { generateColors } from '@/utils/color'
import { writeNewStyle } from '@/utils/writeNewStyle'
import { useStore } from '@/store'

interface IUserGenerateTheme {
  generateTheme: (color: string) => void
}

export const useGenerateTheme = ():IUserGenerateTheme => {
  const store = useStore()
  const defaultTheme = computed(() => store.state.settings.theme)
  const originalStyle = computed(() => store.state.settings.originalStyle)
  // 生成主题
  // element ui 设计 https://juejin.cn/post/6844903960218697741
  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    }, generateColors(color))
    // 写入新的css样式
    writeNewStyle(originalStyle.value, colors)
  }
  // 第一步 远程获取element-ui 主题文件作为模板 然后进行变量替换 替换成我们所选主题色
  const { getThemeChalkStyle } = useThemeFiles()
  if (!originalStyle.value) {
    getThemeChalkStyle().then(data => {
      // data是主题文件的css内容
      const styleValue = getStyleTemplate(data as string)
      store.dispatch('settings/changeSetting', { key: 'originalStyle', value: styleValue })
      generateTheme(defaultTheme.value)
    })
  } else {
    generateTheme(defaultTheme.value)
  }
  return {
    generateTheme
  }
}
