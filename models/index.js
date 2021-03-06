const { Sequelize } = require('sequelize');
const { sequelize: db } = require('../config/config').database

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

const users = require("./user.model")(sequelize, Sequelize)
const products = require("./product.model")(sequelize, Sequelize)
const vendors = require("./vendor.model")(sequelize, Sequelize)

vendors.hasMany(products, {foreignKey: 'id_vendor', sourceKey: 'id'});
products.belongsTo(vendors, {foreignKey: 'id_vendor', targetKey: 'id'});

module.exports = {
  Sequelize,
  sequelize,
  
  users,
  products,
  vendors
}