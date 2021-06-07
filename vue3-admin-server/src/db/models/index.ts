import UserModel from './user'
import AccessModel from './access'
import RolesModel from './roles'
import RoleAccessModel from './roleAccess'
import UserRoleModel from './userRole'

// 外键关联 建立从属关系
;(() => {
  /**
   * onDelete onUpdate
   * https://www.sequelize.com.cn/core-concepts/assocs#ondelete-%E5%92%8C-onupdate
   * https://blog.csdn.net/yajing8/article/details/73014004
  */
  // RoleMenuModel.role_id = UserModel.id
  RoleAccessModel.belongsTo(RolesModel, {
    // 父表delete、update的时候，子表会delete、update掉关联记录；
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  // RoleMenuModel.role_id = AccessModel.id
  RoleAccessModel.belongsTo(AccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'access_id'
  })

  // 双向关联 有利于双向联表查询
  RolesModel.hasMany(RoleAccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  AccessModel.hasMany(RoleAccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'access_id'
  })

  // UserRoleModel.role_id = RolesModel.id
  UserRoleModel.belongsTo(RolesModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  // UserRoleModel.role_id = UserModel.id
  UserRoleModel.belongsTo(UserModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'user_id'
  })

  // 双向关联 有利于双向联表查询
  RolesModel.hasMany(UserRoleModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  UserModel.hasMany(UserRoleModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'user_id'
  })
})()

export {
  UserModel,
  AccessModel,
  RolesModel,
  RoleAccessModel,
  UserRoleModel
}
