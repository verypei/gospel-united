'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supports.belongsTo(models.Users,{foreignKey:"user_id"});
      Supports.belongsTo(models.Prays,{foreignKey:"user_id"});
    }
  };
  Supports.init({
    pray_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Supports',
  });
  return Supports;
};