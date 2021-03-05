const { Sequelize } = require('sequelize');
const { sequelize: db } = require('../config/config').database


// const sequelize = new Sequelize(database.sequelize.database, database.sequelize.username, database.sequelize.password, {
//   host: database.sequelize.host,
//   dialect: database.sequelize.dialect,
//   dialectOptions: {
//       // ssl: true,
//       // rejectUnauthorized: false
//     },
//   pool: {
//       max: 3,
//       min: 0,
//       idle: 3000,
//       acquire: 10000
//   }   
// })
console.log(db);
const sequelize = new Sequelize( {
  database: db.database,
  username: db.username,
  password: db.password,
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  dialectOptions: db.dialectOptions,
  define: db.define,
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