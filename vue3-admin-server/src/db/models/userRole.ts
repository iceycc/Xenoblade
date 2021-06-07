import { DataTypes, Model, Optional } from 'sequelize'
import seq from '../seq'

export interface UserRoleModelProps {
  id: number;
  user_id: number;
  role_id: number;
}

interface UserRoleCreationAttributes extends Optional<UserRoleModelProps, "id"> {}

interface UserRoleInstance extends Model<UserRoleModelProps, UserRoleCreationAttributes>, UserRoleModelProps {}

const UserRole = seq.define<UserRoleInstance>('UserRole', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    comment: '外键 关联user表id'
  },
  role_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    comment: '外键 关联roles表id'
  }
})

export default UserRole
