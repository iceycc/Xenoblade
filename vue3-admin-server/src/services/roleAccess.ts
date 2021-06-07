import { AccessModel, RoleAccessModel, RolesModel } from '../db/models'
import Sequelize from 'sequelize'
import { AccessRole } from './types'

const Op = Sequelize.Op

/**
 * 删除与该角色相关联记录
 * @param id 角色id
 */
export const destroyRoleAccessByRoleID = async (id: number) => {
  const result = await RoleAccessModel.destroy({
    where: {
      role_id: id
    }
  })
  return result
}

/**
 * 添加与该角色相关联记录
 * @param id 角色id
 * @param access 菜单id列表
 */
export const createRoleAccess = async (id: number, access: number[]) => {
  const records = access.map(aid => ({
    role_id: id,
    access_id: aid
  }))
  // 批量插入
  const result = await RoleAccessModel.bulkCreate(records)
  return result
}

/**
 * 获取与该角色相关联记录
 * @param id 角色id
 */
export const getRoleAccessByID = async (id: number) => {
  const result = await RoleAccessModel.findAll({
    attributes: ['id', 'role_id', 'access_id'],
    where: {
      role_id: id
    }
  })
  return result
}


export const getAccessByRolesService = async (roles: number[]) => {
  const { rows } = await AccessModel.findAndCountAll({
    // https://blog.csdn.net/Tirst_/article/details/109677451
    distinct: true, // 去重  解决findAndCountAll联表查询时 count数不准确问题解决
    order: [
      ['sort_id', 'ASC']
    ],
    include: [
      {
        model: RoleAccessModel,
        attributes: ['id'],
        where: {
          // [Op.or]: whereProps,
          role_id: {
            [Op.in]: roles
          }
        },
        include: [
          {
            model: RolesModel,
            attributes: ['id', 'name', 'description']
          }
        ]
      }
    ]
  })
  const access = rows.map(row => {
    const ac = row.toJSON() as AccessRole
    ac.roles = ac.RoleAccesses?.map(item => item.Role)
    delete ac.RoleAccesses
    return ac
  })
  return {
    access
  }
}
