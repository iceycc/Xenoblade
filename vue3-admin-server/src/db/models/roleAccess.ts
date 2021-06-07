import { DataTypes, Model, Optional } from 'sequelize'
import seq from '../seq'

export interface RoleAccessModelProps {
  id: number;
  role_id: number;
  access_id: number;
}

interface RoleAccessCreationAttributes extends Optional<RoleAccessModelProps, "id"> {}

interface RoleAccessInstance extends Model<RoleAccessModelProps, RoleAccessCreationAttributes>, RoleAccessModelProps {}

const RoleAccess = seq.define<RoleAccessInstance>('RoleAccess', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  role_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    comment: '外键 关联roles表id'
  },
  access_id: {
    type: DataTypes.INTEGER,
    comment: '外键 关联access表id'
  }
})

export default RoleAccess
