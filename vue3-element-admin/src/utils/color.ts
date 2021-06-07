import color from 'css-color-function'
import { formula, IObject } from './constants'

// 转换成不同色调的rgb颜色值
// https://www.w3cplus.com/css/the-power-of-rgba.html
export const generateColors = (primary: string): IObject => {
  const colors = {} as IObject
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value) // 转换成rgba颜色值
  })
  return colors
}
