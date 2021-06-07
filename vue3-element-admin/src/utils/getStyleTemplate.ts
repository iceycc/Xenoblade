export interface IObject {
  [prop: string]: string
}

// element ui 关于以下颜色设计阅读资料
// https://juejin.cn/post/6844903960218697741
// 官方文档说明
// https://element-plus.gitee.io/#/zh-CN/component/custom-theme
// element-plus ui每套主题 共用到以下多种颜色 根据根据白色和主题色进行混合生成渐变色
// Mix 函数是将两种颜色根据一定的比例混合在一起，生成另一种颜色
// $--color-primary: #409EFF !default;
// $--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
// $--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
// $--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
// $--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
// $--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
// $--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
// $--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
// $--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
// $--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */
// 根据样式内容生成样式模板
export const getStyleTemplate = (data: string): string => {
  const colorMap: IObject = {
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
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
