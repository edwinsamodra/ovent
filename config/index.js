const { database } = require('./config')

// console.log(database.environment)
const cfg = {}
cfg[database.environment] = database.sequelize;

module.exports = cfg