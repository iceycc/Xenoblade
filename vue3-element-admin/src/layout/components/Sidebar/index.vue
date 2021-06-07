<template>
  <div class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <scroll-panel>
      <el-menu
        class="sidebar-container-menu"
        :class="{
          'sidebar-show-logo': showLogo
        }"
        mode="vertical"
        :default-active="activeMenu"
        :background-color="scssVariables.menuBg"
        :text-color="scssVariables.menuText"
        :active-text-color="themeColor"
        :collapse="isCollapse"
        :collapse-transition="true"
      >
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </scroll-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'
import { useStore } from '@/store'
import Logo from './Logo.vue'
import ScrollPanel from '@/components/ScrollPanel.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem,
    ScrollPanel
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    // 根据路由路径 对应 当前激活的菜单
    const activeMenu = computed(() => {
      const { path, meta } = route
      // 可根据meta.activeMenu指定 当前路由激活时 让哪个菜单高亮选中
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 展开收起状态 稍后放store 当前是展开就让它收起
    const isCollapse = computed(() => !store.getters.sidebar.opened)

    // 获取权限菜单
    const menuList = computed(() => store.state.menu.authMenuTreeData)

    // 渲染路由
    const menuRoutes = computed(() => [...menuList.value] as unknown[] as RouteRecordRaw[])

    // 获取主题色
    const themeColor = computed(() => store.getters.themeColor)

    // 是否显示logo
    const showLogo = computed(() => store.state.settings.sidebarLogo)

    return {
      // ...toRefs(variables), // 不用toRefs原因 缺点variables里面变量属性来源不明确
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
      themeColor,
      showLogo
    }
  }
})
</script>

<style lang="scss" scoped>
  .sidebar-wrapper {
    .sidebar-container-menu {
      height: 100vh;
      &.sidebar-show-logo { // 显示logo时
        // 100vh-50px
        height: calc(100vh - 50px);
      }
    }
  }
</style>
