import {
  UserModel,
  AccessModel,
  RolesModel,
  RoleAccessModel,
  UserRoleModel
} from './db/models'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

;(async () => {
  const { rows } = await RolesModel.findAndCountAll({
    where: {
      [Op.or]: [{ id: 1 }, { id: 5 }]
    },
    // https://blog.csdn.net/Tirst_/article/details/109677451
    distinct: true, // 去重  解决findAndCountAll联表查询时 count数不准确问题解决
    include: [ // 联表查询
      {
        model: RoleAccessModel,
        attributes: ['id'],
        include: [
          {
            model: AccessModel,
            attributes: ['id', 'title', 'path', 'icon']
          }
        ]
      }
    ]
  })
  console.log('rows', rows)
})()
