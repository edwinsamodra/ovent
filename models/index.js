const { Sequelize } = require('sequelize');
const { database } = require('../config/config')


const sequelize = new Sequelize(database.sequelize.database, database.sequelize.username, database.sequelize.password, {
  host: database.sequelize.host,
  dialect: database.sequelize.dialect,

  pool: {
      max: 3,
      min: 0,
      idle: 3000,
      acquire: 10000
  }   
})
// console.log("AAAAAAAAAAAAAAAAA");
const users = require("./user")(sequelize, Sequelize);

module.exports = {
  Sequelize,
  sequelize,
  
  users
}