require('dotenv').config()

const config = {
    database: {
        environment: process.env.environment || 'development',
        sequelize: {
            username: process.env.DBUSERNAME || 'root',
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            host: process.env.DBHOST,
            dialect: process.env.DBDIALECT || 'postgres',
            port: process.env.DBPORT || 5432,
            define: {
                charset: 'utf8mb4',
                    dialectOptions: {
                    collate: 'utf8mb4_unicode_ci'
                }
            }
        }
    },

    JWTSECRET: process.env.JWTSECRET || "123123"
}

module.exports = config