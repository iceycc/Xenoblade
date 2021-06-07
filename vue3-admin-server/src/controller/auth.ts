import { createUser, getUserInfo, getUserInfoAndRoles } from '../services/auth'
import { ErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'
import { createMd5 } from '../utils/createMD5'
import { createToken, getInfoByToken } from '../utils/token'
import { allocUserRoleService } from '../services/user'
import { RegisterPropsWithRoles } from './types'

const {
 registerUserNameExistInfo,
 registerFailInfo,
 loginFailInfo,
 getUserInfoFailInfo
} = errorInfo

/**
 * 用户注册controller
 * @param params RegisterModel
 */
export const registerController = async (params: RegisterPropsWithRoles) => {
  const { username, password = '111111' } = params // 添加用户没设密码默认111111
  // 先看下用户是否已注册
  const userInfo = await getUserInfo({ username })
  if (userInfo) { // 如果已注册
    // 用户已注册
    const { code, message } = registerUserNameExistInfo
    return new ErrorResponse(code, message)
  }
  const { roleIds = [] } = params
  // 用户不存在
  try {
    const result = await createUser({ // 创建用户
      ...params,
      password: createMd5(password)
    })
    await allocUserRoleService(result.id, roleIds)
    return new SuccessResponse(result)
  } catch (err) { // 注册失败
    console.log(err.message, err.stack)
    const { code, message } = registerFailInfo
    return new ErrorResponse(code, message)
  }
}

// 登录controller
interface LoginModel {
  username: string;
  password: string;
}
export const loginController = async (params: LoginModel) => {
  const { username, password } = params
  // 根据用户名和密码 获取用户信息
  const userInfo = await getUserInfo({ username, password })
  if (userInfo) { // 能获取到返回token
    const { id, username } = userInfo
    const token = createToken({
      id,
      username
    })
    return new SuccessResponse({ token })
  }
  // 获取不到返回 登录失败
  const { code, message } = loginFailInfo
  return new ErrorResponse(code, message)
}

/**
* 用户信息
* @param param string
*/

interface UserTokenInfo {
  id: number;
  username: string;
}
export const userInfoController = async (param = '') => {
  const token = param.split(' ')[1]
  if (token) {
    // 根据token解析token信息
    const tokenInfo = await getInfoByToken<UserTokenInfo>(token)
    if (tokenInfo) {
      const { id } = tokenInfo
      const userInfo = await getUserInfoAndRoles(id)
      return new SuccessResponse(userInfo)
    }
  }
  const { code, message } = getUserInfoFailInfo
  return new ErrorResponse(code, message)
}
