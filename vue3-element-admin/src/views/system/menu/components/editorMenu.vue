<template>
  <div class="editor-container">
    <el-form
      ref="editFormRef"
      :model="editData"
      :rules="menuFormRules"
      label-width="100px"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input
          v-model="editData.title"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="editData.path"
          placeholder="请输入路由路径"
        />
      </el-form-item>
      <el-form-item label="路由Name" prop="name">
        <el-input
          v-model="editData.name"
          placeholder="请输入路由名称"
        />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          v-model="editData.icon"
          placeholder="请输入icon名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitMenuForm"
          :loading="loading"
        >编辑菜单</el-button>
        <el-button @click="submitReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, getCurrentInstance } from 'vue'
import { MenuData } from '@/store/modules/menu'
import { ElForm } from 'element-plus'
import { updateMenuByID } from '@/api/menu'
import { useStore } from '@/store'
import { useReloadPage } from '@/hooks/useReload'

type FormInstance = InstanceType<typeof ElForm>

export default defineComponent({
  name: 'EditorMenu',
  props: {
    data: {
      type: Object as PropType<MenuData>
    }
  },
  emits: ['updateEdit'],
  setup(props) {
    const store = useStore()
    const { proxy } = getCurrentInstance()!
    const loading = ref(false)
    const editFormRef = ref<FormInstance|null>(null)
    const editData = ref({
      id: '',
      title: '',
      name: '',
      path: '',
      icon: ''
    })

    // 验证规则
    const menuFormRules = {
      title: {
        required: true,
        message: '请输入菜单名称',
        trigger: 'blur'
      },
      path: {
        required: true,
        message: '请输入路由路径',
        trigger: 'blur'
      },
      name: {
        required: true,
        message: '请输入路由名称',
        trigger: 'blur'
      }
    }

    const resetFormData = (data: MenuData) => {
      if (data) {
        const { id, title, name, path, icon } = data
        editData.value = { id: String(id), title, name, path, icon }
      }
    }

    watch(() => props.data, (value) => {
      if (value) {
        resetFormData(value)
      }
    })

    // 刷新系统
    const { reloadPage } = useReloadPage()

    // 提交编辑菜单
    const submitMenuForm = () => {
      (editFormRef.value as FormInstance).validate(valid => {
        if (valid) {
          loading.value = true
          updateMenuByID(Number(editData.value.id), editData.value).then(res => {
            if (res.code === 0) {
              proxy?.$message.success('菜单编辑成功')
              // 重新获取菜单
              store.dispatch('menu/getAllMenuList')
              reloadPage()
            }
          }).finally(() => {
            loading.value = false
          })
        }
      })
    }

    // 重置编辑菜单
    const submitReset = () => {
      resetFormData(props.data as MenuData)
    }

    return {
      editData,
      submitMenuForm,
      submitReset,
      editFormRef,
      menuFormRules,
      loading
    }
  }
})
</script>
