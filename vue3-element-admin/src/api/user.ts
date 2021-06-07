import request from '@/api/config/request'
import { IUserQuery, Profile } from '@/store/modules/user'
import { ApiResponse } from './type'

interface UserLoginData {
  username: string;
  password: string;
}

interface LoginResponseData {
  token: string;
}

export const login = (data: UserLoginData): Promise<ApiResponse<LoginResponseData>> => {
  return request.post(
    '/auth/login',
    data
  )
}

// 获取用户信息
interface UserBody {
  token: string;
}
export const getUserInfo = (data?: UserBody): Promise<ApiResponse<Profile>> => {
  return request.post('/auth/info', data)
}

// 获取用户列表
interface IUsers {
  users: Profile[];
  count: number;
}
export const getUsers = (params: IUserQuery): Promise<ApiResponse<IUsers>> => {
  const { pageNum = 0, pageSize = 10, username = '', status, mobile = '' } = params
  return request.get('/user', {
    params: {
      pageNum,
      pageSize,
      username,
      status,
      mobile
    }
  })
}

// 删除用户
export const removeUser = (id: number): Promise<ApiResponse> => {
  return request.delete(`/user/${id}`)
}

// 添加用户
export const addUser = (data: Profile): Promise<ApiResponse> => {
  return request.post('/auth/register', data)
}

// 编辑用户
export const updateUser = (id: number, data: Profile): Promise<ApiResponse> => {
  return request.put(`/user/${id}`, data)
}
