<template>
  <div>
    <h1>Dashboard page</h1>
    缓存测试 <input type="text">
    <el-button v-permission="['super_admin']" type="primary">size改变</el-button>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss">
  .custom-class { // 自定义样式404
    font-size: 200px;
    color: green;
  }
</style>
