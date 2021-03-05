'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // defaultValue: uuid()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isEmail: true
      // },
      unique: true
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value){
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

  User.beforeCreate(user => user.id = uuid());

  return User;
};