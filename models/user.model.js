'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('pass', bcrypt.hashSync(value, 10))
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token_verified: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.toJSON = function(){
        var values = Object.assign({}, this.get())

      delete values.password
      return values
  }

  return User;
};