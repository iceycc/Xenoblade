import { DataTypes, Model, Optional } from 'sequelize'
import seq from '../seq'

export interface AccessModelProps {
  id: number;
  type: number;
  title: string;
  path: string;
  icon: string;
  name: string;
  sort_id: number;
  parent_id: number | null;
  status: 0 | 1;
  description: string;
}

interface AccessCreationAttributes extends Optional<AccessModelProps, "id"> {}

interface AccessInstance
  extends Model<AccessModelProps, AccessCreationAttributes>,
    AccessModelProps {}

const AccessModel = seq.define<AccessInstance>('Access', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  type: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '权限类型：菜单'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标题名称'
  },
  path: {
   type: DataTypes.STRING,
   comment: 'url地址'
  },
  icon: {
    type: DataTypes.STRING,
    comment: 'icon名称'
  },
  name: {
    type: DataTypes.STRING,
    comment: '路由name'
  },
  sort_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '排序权重'
  },
  parent_id: {
    type: DataTypes.INTEGER,
    comment: '父id'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    comment: '状态 0禁止 1正常'
  },
  description: {
    type: DataTypes.TEXT,
    comment: '描述'
  }
})

export default AccessModel
