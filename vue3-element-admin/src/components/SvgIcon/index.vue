<template>
  <!-- 如果iconClass是带协议的图标链接 则通过style属性方式渲染-->
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!--
      SVG中的use元素可以调用其他SVG文件的元素，只要在一个文档中。
      阅读张鑫旭大佬文章就明白了
    -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate'
import { computed, defineComponent } from 'vue'

/**
 * v-bind="$attrs"
 * vue3.0中$lietens已被移除 现在事件监听器是 attrs 的一部分
 * 文档说明：https://v3.cn.vuejs.org/guide/migration/listeners-removed.html#_3-x-%E8%AF%AD%E6%B3%95
 */
export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    iconClass: { // 图标名称 or svg链接
      type: String,
      require: true
    },
    className: { // 自定义类名
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 是否是带协议的图片链接
    const isExt = computed(() => isExternal(props.iconClass || ''))
    // 拼接成symbolId
    const iconName = computed(() => `#icon-${props.iconClass}`)
    // 添加类名 props.className外部传入自定义类名
    const svgClass = computed(() =>
      props.className ? `svg-icon ${props.className}` : 'svg-icon'
    )
    // 如果iconClass是带协议的图标链接 则通过style属性方式渲染
    // 支持使用外链的形式引入 svg。例如：
    // <svg-icon icon-class="https://xxxx.svg />
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }))

    return {
      isExt,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
