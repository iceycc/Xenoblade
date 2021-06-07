
import request from '@/api/config/request'
import { IRole, IRoleState } from '@/store/modules/role'
import { ApiResponse } from './type'

// 获取角色
export interface RoleParams {
  pageNum: number;
  pageSize: number;
}

export const getRoles = (params = { pageNum: 0, pageSize: 10 }): Promise<ApiResponse<IRoleState>> => {
  return request.get('/role', {
    params
  })
}

// 删除角色
export const removeRole = (id: number): Promise<ApiResponse> => {
  return request.delete(`/role/${id}`)
}

// 添加角色
export const addRole = (data: IRole): Promise<ApiResponse> => {
  return request.post('/role', data)
}

// 编辑角色
export const updateRole = (id: number, data: IRole): Promise<ApiResponse> => {
  return request.put(`/role/${id}`, data)
}
