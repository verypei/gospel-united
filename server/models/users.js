'use strict';
const bcrypt = require("bcrypt");
// const {Profiles} = require("./profiles");
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
      Users.hasMany(models.Prays,{foreignKey:"user_id"});
      Users.hasMany(models.Supports,{foreignKey:"user_id"});
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
    },
    afterCreate: (instance,options)=>{
      const {Profiles} = sequelize.models
      let id = instance.dataValues.id
      // set user_id in profile table
      return Profiles.create({user_id:id})
    }
  },sequelize},{
    sequelize,
    modelName: 'Users',
  });
  return Users;
};