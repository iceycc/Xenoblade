import {
  createRoleAccess,
  destroyRoleAccessByRoleID,
  getRoleAccessByID,
  getAccessByRolesService
} from '../services/roleAccess'
import { SuccessResponse, createErrorResponse } from '../utils/Response';
import errorInfo from '../constants/errorInfo'

const {
  allocRoleAccessFailInfo,
  getRoleAccessFailInfo
} = errorInfo

export const addRoleAccessController = async (id: number, access: number[]) => {
  // 先移除之前该角色关联记录
  await destroyRoleAccessByRoleID(id)
  try {
    // 批量插入记录
    await createRoleAccess(id, access)
    return new SuccessResponse(null, '权限分配成功')
  } catch (error) {
    console.error(error)
    return createErrorResponse(allocRoleAccessFailInfo)
  }
}

export const getRoleAccessController = async (id: number) => {
  try {
    // 批量插入记录
    const result = await getRoleAccessByID(id)
    return new SuccessResponse(result)
  } catch (error) {
    return createErrorResponse(getRoleAccessFailInfo)
  }
}


export const getAccessByRolesController = async (roles: number[]) => {
  try {
    // 批量插入记录
    const result = await getAccessByRolesService(roles)
    return new SuccessResponse(result)
  } catch (error) {
    return createErrorResponse(getRoleAccessFailInfo)
  }
}
