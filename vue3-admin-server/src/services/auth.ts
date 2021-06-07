import UserModel, { RegisterModel, UserModelProps } from '../db/models/user'
import { UserWhereProps } from './types'
import { createMd5 } from '../utils/createMD5'
import { RolesModel, UserRoleModel } from '../db/models'
import { UserInfo } from './types'

/**
 * 创建用户
 */
 export const createUser = async ({ username, password, email, mobile, status, avatar }: RegisterModel): Promise<UserModelProps> => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status
  })
  return result.toJSON() as UserModelProps
}


/**
 * 根据用户名 获取用户信息
 * @param username 用户名
 * @param password  密码
 * @param id  用户id
 * @returns 用户信息
 */
 export const getUserInfo = async ({ username, password, id }: UserWhereProps): Promise<UserModelProps | null> => {
  const where: UserWhereProps = {
    username
  }
  if (password) {
    where.password = createMd5(password)
  }
  if (typeof id != 'undefined') {
    where.id = id
  }

  const result = await UserModel.findOne({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    },
    where,
  })
  if (result == null) return null
  return result.toJSON() as UserModelProps
}

// 获取用户信息 包含 角色信息
export const getUserInfoAndRoles = async (id: number) => {
  const result = await UserModel.findOne({
    attributes: ['id', 'username', 'email', 'mobile', 'isSuper', 'status', 'avatar', 'description'],
    where: {
      id
    },
    include: [ // 联表查询
      {
        model: UserRoleModel,
        attributes: ['id'],
        include: [
          {
            model: RolesModel,
            attributes: ['id', 'name', 'description']
          }
        ]
      }
    ]
  })
  if (!result) return null
  const user = result.toJSON() as UserInfo
  user.roles = user.UserRoles?.map(item => item.Role)
  delete user.UserRoles
  return user
}
