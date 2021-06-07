<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker />
    </div>

    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="tagsView" class="drawer-switch" />
    </div>

    <!-- 侧边栏loggo  -->
    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="showSidebarLogo" class="drawer-switch" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ThemePicker from '@/components/ThemePicker/index.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Settings',
  components: {
    ThemePicker
  },
  setup() {
    const store = useStore()
    const tagsView = computed({
      get() {
        return store.state.settings.tagsView
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    })

    const showSidebarLogo = computed({
      get() {
        return store.state.settings.sidebarLogo
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })

    return {
      tagsView,
      showSidebarLogo
    }
  }
})
</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      font-size: 16px;
      color: rgba(0, 0, 0, .65);
    }
  }
</style>
