<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
    >
      <span
          v-if="index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, RouteLocationMatched, RouteLocationRaw } from 'vue-router'
import { compile } from 'path-to-regexp'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<Array<PartialRouteLocationMatched>>([])

    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    const getBreadcrumb = () => {
      let matched = route.matched.filter(item => item.meta && item.meta.title) as PartialRouteLocationMatched[]
      const first = matched[0]
      if (!isDashboard(first)) {
        matched = ([{
          path: '/dashboard',
          meta: {
            title: 'Dashboard'
          }
        }] as PartialRouteLocationMatched[]).concat(matched)
      }
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    onBeforeMount(() => {
      getBreadcrumb()
    })

    watch(() => route.path, () => {
      getBreadcrumb()
    })

    // 主要是针对 动态路由 /user/:id 进行动态参数填充
    // path-to-regexp 文档说明 https://www.npmjs.com/package/path-to-regexp
    const pathCompile = (path: string) => {
      const toPath = compile(path)
      const params = route.params
      return toPath(params)
    }

    const handleLink = (route: RouteLocationMatched) => {
      const { path, redirect } = route
      // 如果是重定向路由 就走重定向路径
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
        return
      }
      router.push(pathCompile(path))
    }
    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  /* float: left; */
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all .5s;
}
</style>
