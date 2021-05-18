'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Profiles.init({
    name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    church: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    avatar:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};