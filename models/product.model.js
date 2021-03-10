module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        id_vendor: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pictures: {
            type: DataTypes.JSON,
            allowNull: true
        },
        rating: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        qty_ready: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        watch: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rent: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        comment: {
            type: DataTypes.JSON,
            allowNull: true
        },
    })

    return Product
}