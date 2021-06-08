# 案例整理

## 功能1：markdown相关功能
### 目标
-[x] 将`.mdxx`文件解析为react tsx组件
-[x] 将`.md`文件解析为html字符串，dom可以通过html属性加载
-[x] markdown编辑预览功能
### 第三方功能，机会参照源码实现基本功能
markdown解析
- https://github.com/markdown-it/markdown-it
- https://github.com/showdownjs/showdown
- https://github.com/markedjs/marked

mdx解析
- https://www.mdxjs.cn/

highlight
- https://highlightjs.org/
## 功能2: Antv/g6
- 实现一个拖拽流程图
## 坑点
- less-loader大于8抱错，切换成7.3
- input是用了onChange去修改状态，每次输入都会失去焦点？ key不是唯一的

