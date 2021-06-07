/**
 * @description 失败信息集合，包括 code 和 message
 * @author 拔都
 */

 export default {
  // 用户名已存在
  registerUserNameExistInfo: {
    code: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    code: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    code: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    code: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    code: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    code: 10006,
    message: '修改密码失败，请重试'
  },
  // 用户信息失败
  getUserInfoFailInfo: {
    code: 10007,
    message: '用户信息获取失败 token验证无效'
  },
  getUserListFailInfo: {
    code: 10008,
    message: '用户列表获取失败, 请重试'
  },
  editUserInfoFailInfo: {
    code: 10009,
    message: '用户信息修改失败, 请重试'
  },
  deleteUserInfoFailInfo: {
    code: 10010,
    message: '用户删除失败, 请重试'
  },
  updateUserRoleFailInfo: {
    code: 10011,
    message: '用户角色修改失败,请重试'
  },
  addAccessFailInfo: {
    code: 10012,
    message: '菜单添加失败'
  },
  getAccessAllFailInfo: {
    code: 10013,
    message: '获取全部菜单失败'
  },
  removeAccessFailInfo: {
    code: 10014,
    message: '删除菜单失败'
  },
  updateAccessFailInfo: {
    code: 10015,
    message: '编辑菜单失败'
  },
  addRoleFailInfo: {
    code: 10016,
    message: '添加角色失败'
  },
  addRoleNameExistInfo: {
    code: 10017,
    message: '角色已存在, 不能重复添加'
  },
  updateRoleFailInfo: {
    code: 10018,
    message: '编辑角色失败'
  },
  updateRoleNameExistInfo: {
    code: 10019,
    message: '编辑失败，已存在同名角色'
  },
  removeRoleFailInfo: {
    code: 10020,
    message: '角色删除失败'
  },
  allocRoleAccessFailInfo: {
    code: 10021,
    message: '角色分配权限失败'
  },
  getRoleAccessFailInfo: {
    code: 10022,
    message: '根据角色获取权限失败'
  },
  updateUserExistFailInfo: {
    code: 10023,
    message: '用户信息修改失败，已存在同名用户'
  },
  allocUserRoleFailInfo: {
    code: 10024,
    message: '用户角色分配失败'
  }
}
