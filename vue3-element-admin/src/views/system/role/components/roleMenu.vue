<template>
  <div v-if="modelValue">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
    >
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="menuTree"
        highlight-current
        :check-strictly="checkStrictly"
        :props="defaultProps">
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" plain @click="handleCheckAll">全部选择</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch, getCurrentInstance, onMounted, nextTick } from 'vue'
import { IRole } from '@/store/modules/role'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'
import { allocRoleAccess, getRoleAccess } from '@/api/roleAccess'
import { useReloadPage } from '@/hooks/useReload'

type ElTreeInstance = InstanceType<typeof ElTree>

export default defineComponent({
  name: 'RoleMenu',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    role: {
      type: Object as PropType<IRole>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance()!
    const store = useStore()
    const menuTree = ref<ElTreeInstance | null>(null)
    const role = props.role as IRole
    const dialogVisible = ref(true)
    const defaultProps = ref({
      children: 'children',
      label: 'title'
    })
    // tree父节点与子节点是否强关联
    const checkStrictly = ref(false) // false关联 true不关联
    const dialogTitle = computed(() => `分配 ${role.name} 菜单权限`)
    const treeData = computed(() => store.getters.menusTree)
    watch(dialogVisible, (value) => {
      emit('update:modelValue', value)
    })

    // 发送选中key与role id关联请求
    const handleRoleWithMenu = (keys: number[], roleId: number) => {
      // 发送关联请求
      allocRoleAccess(roleId, keys).then(res => {
        if (res.code === 0) {
          proxy?.$message.success(res.message)
          emit('update:modelValue', false)
          reloadPage()
        }
      })
    }

    // 重新刷新整个系统
    const { reloadPage } = useReloadPage()

    // 提交选择的菜单和当前角色做关联
    const handleSubmit = () => {
      const tree = (menuTree.value as ElTreeInstance)
      // 获取所有checkbox全选节点key 这里key是菜单id
      const keys = tree.getCheckedKeys(false)
      // 获取所有半选中节点key 这里key是菜单id
      const halfKeys = tree.getHalfCheckedKeys()
      const selectedKeys = [...halfKeys, ...keys]
      handleRoleWithMenu(selectedKeys as number[], role.id)
    }

    // 根据权限列表 设置权限选中
    const setAccessTreeChecked = (access: number[]) => {
      (menuTree.value as ElTreeInstance).setCheckedKeys(access, false)
      nextTick(() => {
        checkStrictly.value = false
      })
    }

    // 获取当前角色 权限列表
    const getRoleAccessList = () => {
      checkStrictly.value = true
      getRoleAccess(role.id).then(res => {
        if (res.code === 0) {
          const access = res.data.map(item => item.access_id)
          // 设置选中权限
          setAccessTreeChecked(access)
        }
      }).catch(() => {
        checkStrictly.value = false
      })
    }

    // tree 全部选中
    const isCheckAll = ref(false)
    const handleCheckAll = () => {
      if (!isCheckAll.value) {
        (menuTree.value as ElTreeInstance).setCheckedNodes(treeData.value, false)
      } else {
        (menuTree.value as ElTreeInstance).setCheckedNodes([], false)
      }
      isCheckAll.value = !isCheckAll.value
    }

    onMounted(() => {
      getRoleAccessList()
    })

    return {
      dialogVisible,
      dialogTitle,
      treeData,
      defaultProps,
      handleSubmit,
      menuTree,
      checkStrictly,
      handleCheckAll
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
