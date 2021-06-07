import Sequelize from 'sequelize'
import AccessModel, { AccessModelProps } from '../db/models/access'

// Sequelize 操作对象 里面包含了 多条件操作 and or in get等
// 操作符参考文档
// https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E5%BA%94%E7%94%A8-where-%E5%AD%90%E5%8F%A5
// https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E6%93%8D%E4%BD%9C%E7%AC%A6
const OP = Sequelize.Op

// 创建菜单资源
export const createAccess = async (params: AccessModelProps) => {
  const result = await AccessModel.create({
    ...params
  })
  return result.toJSON()
}

// 获取所有菜单资源
export const getAllAccess = async () => {
  const result = await AccessModel.findAll({
    order: [
      ['sort_id', 'ASC']
    ]
  })
  return result
}

// 通过id删除菜单 包括parentId为该id的菜单
export const removeAccessById = async (id: number) => {
  const result = await AccessModel.destroy({
    where: {
      [OP.or]: [ // id=1 or parent_id=1
        { id },
        { parent_id: id }
      ]
    }
  })
  return result
}

// 编辑菜单
export const updateAccessById = async (id: number, data: AccessModelProps) => {
  const { title, name, path, icon } = data
  const result = await AccessModel.update({
    title,
    name,
    path,
    icon
  }, {
    where: {
      id
    }
  })
  return result
}

// 批量更新菜单
export const updateBulkAccess = async (data: AccessModelProps[]) => {
  console.log('data', data)
  const result = await AccessModel.bulkCreate(data, {
    updateOnDuplicate: ['sort_id']
  })
  return result
}
