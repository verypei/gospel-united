'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prays.belongsTo(models.Users,{foreignKey:"user_id"})
      Prays.belongsTo(models.Supports,{foreignKey:"user_id"})
    }
  };
  Prays.init({
    pray: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    up_lifting: DataTypes.INTEGER,
    support: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Prays',
  });
  return Prays;
};