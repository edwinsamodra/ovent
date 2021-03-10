module.exports = (sequelize, DataTypes) => {
    const Vendor = sequelize.define('Vendors', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        no_whatsapp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
    })

    return Vendor
}