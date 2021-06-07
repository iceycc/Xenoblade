<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>关于我</span>
        </div>
      </template>
      <div class="profile" v-if="userInfo">
        <div class="avatar">
          <img :src="avatar" alt="" />
        </div>
        <h2>用户名：{{ userInfo.username }}</h2>
        <h3>用户角色：{{ roleNames }}</h3>
        <div v-if="userInfo.description">
          <span>个人说明</span>
          <p>{{ userInfo.description }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import defaultAvatar from '@/assets/logo.png'

export default defineComponent({
  name: 'Profile',
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    const roleNames = computed(() => store.getters.roleNames)

    const avatar = computed(() => userInfo?.value?.avatar || defaultAvatar)
    return {
      userInfo,
      avatar,
      roleNames
    }
  }
})
</script>

<style lang="scss" scoped>
  .profile-container {
    width: 500px;
    margin: 10px auto;
    .profile {
      text-align: center;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
