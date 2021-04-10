'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Email can't be empty"
        }
      }
    },
    user_name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"username can't be empty"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Password can't be empty"
        }
      }
    }
  }, {hooks: {
    beforeCreate: (instance, options) => {
      let salt = bcrypt.genSaltSync(8);
      let hash = bcrypt.hashSync(instance.password,salt);
      instance.password = hash;
    }
  },sequelize},{
    sequelize,
    modelName: 'Users',
  });
  return Users;
};