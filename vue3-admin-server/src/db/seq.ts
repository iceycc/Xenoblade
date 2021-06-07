import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('vue3-admin', 'icey', 'icey-226-123456', {
  host: '101.201.253.226',
  dialect: 'mysql', // 连什么类型数据库
  timezone: '+08:00', // 东八时区
  pool: { // 连接池
    max: 5, // 最大连接数量
    min: 0,
    idle: 10000 // 一个连接池10s之内 没有被使用 则释放
  }
})

export default sequelize
