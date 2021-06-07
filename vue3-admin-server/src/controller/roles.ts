import { RoleModelProps } from '../db/models/roles'
import { createRole, getRole, getAllRoleService, updateRoleById, removeRoleById } from '../services/roles'
import { createErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'

const {
  addAccessFailInfo,
  addRoleNameExistInfo,
  updateRoleFailInfo,
  updateRoleNameExistInfo,
  removeRoleFailInfo
} = errorInfo

// 添加菜单
export const addRoleController = async (params: RoleModelProps) => {
  const result = await getRole(params.name)
  if (result) {
    return createErrorResponse(addRoleNameExistInfo)
  }
  if (params) {
    try {
      const result = await createRole({
        ...params
      })
      return new SuccessResponse(result)
    } catch (error) {
      console.error(error.message)
      return createErrorResponse(addAccessFailInfo)
    }
  }
}

// 获取全部菜单
interface RoleListParams {
  offset: number;
  limit: number;
}

export const getAllRoleController = async ({ offset, limit }: RoleListParams) => {
  try {
    const result = await getAllRoleService(offset, limit)
    return new SuccessResponse(result)
  } catch (error) {
    console.error(error.message)
    return createErrorResponse(addAccessFailInfo)
  }
}

// 编辑角色
export const updateRoleController = async (id: number, data: RoleModelProps) => {
  const result = await getRole(data.name || '')
  if (result && result.id !== id) {
    return createErrorResponse(updateRoleNameExistInfo)
  }
  try {
    await updateRoleById(id, data)
    return new SuccessResponse(null, '角色编辑成功!')
  } catch (error) {
    console.error(error.message)
    return createErrorResponse(updateRoleFailInfo)
  }
}

// 删除角色
export const removeRoleController = async (id: number) => {
  try {
    await removeRoleById(id)
    return new SuccessResponse(null, '删除成功!')
  } catch (error) {
    console.error(error.message)
    return createErrorResponse(removeRoleFailInfo)
  }
}