import {
  Model,
  DataTypes,
  Optional
} from 'sequelize'
import seq from '../seq'

export interface RoleModelProps {
  id: number;
  name: string;
  description: string;
  is_default: number;
}

interface RoleCreationAttributes extends Optional<RoleModelProps, "id" | "is_default"> {}

interface RoleInstance
  extends Model<RoleModelProps, RoleCreationAttributes>,
  RoleModelProps {}

const Role = seq.define<RoleInstance>('Role', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    comment: '角色名称 唯一'
  },
  description: {
    type: DataTypes.TEXT,
    comment: '说明描述'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    comment: '默认角色 1是 0不是'
  }
})

export default Role
