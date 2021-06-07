<template>
  <div class="role-container">
    <h2>角色管理</h2>
    <div class="role-list">
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        @click="handleAddRole"
      >添加角色</el-button>
      <el-table
        :data="roles"
        max-height="400"
      >
        <el-table-column
          prop="name"
          label="角色名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="说明"
        >
        </el-table-column>
        <el-table-column
          prop="is_default"
          label="是否默认角色"
          width="80"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          :formatter="formatterCreatedAt"
        >
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          :formatter="formatterUpdatedAt"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="150px"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleRoleMenu(scope.$index, scope.row)">
              菜单权限
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleEditRole(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleDeleteRole(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="role-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :total="total"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes,jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增角色 编辑角色面板 -->
    <right-panel v-model="panelVisible" :title="panelTitle" :size="330">
      <editor-role
        :type="editType"
        :data="editData"
        @submit="handleSubmitRole"
      />
    </right-panel>
    <!-- 权限菜单树 -->
    <role-menu
      v-if="roleData && roleMenuVisible"
      :role="roleData"
      v-model="roleMenuVisible"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect, getCurrentInstance, onMounted } from 'vue'
import { useStore } from '@/store'
import { IRole } from '@/store/modules/role'
import EditorRole from './components/editorRole.vue'
import RightPanel from '@/components/RightPanel/index.vue'
import RoleMenu from './components/roleMenu.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Role',
  components: {
    EditorRole,
    RightPanel,
    RoleMenu
  },
  setup () {
    const { proxy } = getCurrentInstance()!
    const store = useStore()
    const roles = computed(() => store.state.role.roles)
    const total = computed(() => store.state.role.count)
    const pageNum = ref(0)
    const pageSize = ref(1)
    const editData = ref<IRole | undefined>(undefined)
    const panelVisible = ref(false)
    const editType = ref(1) // 0编辑 1新增
    // panel title
    const panelTitle = computed(() => editType.value === 1 ? '新增角色' : '编辑角色')

    // 获取角色列表
    const getRoleList = () => {
      store.dispatch('role/getRoles', {
        pageNum: pageNum.value,
        pageSize: pageSize.value
      })
    }

    // 获取全部菜单
    onMounted(() => {
      store.dispatch('menu/getAllMenuList')
    })
    // 自动追踪相关依赖属性变动获取数据
    watchEffect(() => {
      getRoleList()
    })

    // 编辑角色处理
    const handleEditRole = (index: number, row: IRole) => {
      editType.value = 0
      editData.value = { ...row }
      panelVisible.value = true
    }

    // 添加角色处理
    const handleAddRole = () => {
      editType.value = 1
      editData.value = {} as IRole
      panelVisible.value = true
    }

    // 删除角色处理
    const handleDeleteRole = (index: number, row: IRole) => {
      proxy?.$confirm(`您确认要删除角色${row.name}吗？`, '删除确认', {
        type: 'warning'
      }).then(() => {
        store.dispatch('role/removeRole', {
          id: row.id,
          pageSize: pageSize.value,
          pageNum: pageNum.value
        }).then(() => {
          proxy?.$message.success('角色删除成功')
        })
      }).catch(() => {
        proxy?.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    // 新增编辑
    const dispatchAction = (action: string, data: IRole, message: string) => {
      store.dispatch(action, {
        ...data,
        pageSize: pageSize.value,
        pageNum: pageNum.value
      }).then(() => {
        proxy?.$message.success(message)
        panelVisible.value = false
      })
    }

    // 新增角色
    const addNewRole = (data: IRole) => {
      dispatchAction('role/addRole', data, '角色添加成功')
    }
    // 编辑角色
    const editRole = (data: IRole) => {
      dispatchAction('role/editRole', data, '角色编辑成功')
    }
    // 提交角色信息
    const handleSubmitRole = (data: IRole) => {
      if (editType.value === 1) { // 新增
        addNewRole(data)
      } else if (editType.value === 0) { // 编辑
        editRole(data)
      }
    }

    // 权限菜单处理
    const roleMenuVisible = ref(false)
    const roleData = ref<IRole|null>(null)
    const handleRoleMenu = (index: number, row: IRole) => {
      roleMenuVisible.value = true
      roleData.value = row
    }

    const formatter = (row: IRole) => {
      return row.is_default ? '是' : '否'
    }

    const formatterCreatedAt = (row: IRole) => {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }

    const formatterUpdatedAt = (row: IRole) => {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }

    // pageSize 改变
    const handleSizeChange = (val: number) => {
      pageSize.value = val
    }
    // pageNum 改变
    const handleCurrentChange = (val: number) => {
      pageNum.value = val - 1 // 页码后端是从0开始的
    }

    return {
      roles,
      handleEditRole,
      handleAddRole,
      handleDeleteRole,
      handleRoleMenu,
      formatter,
      formatterCreatedAt,
      formatterUpdatedAt,
      total,
      handleSizeChange,
      handleCurrentChange,
      pageSize,
      panelVisible,
      editData,
      editType,
      panelTitle,
      handleSubmitRole,
      roleData,
      roleMenuVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.role-container {
  padding: 30px;
  .role-pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
