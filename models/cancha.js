"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cancha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cancha.hasMany(models.Reserva, {
        foreignKey: "canchaId",
        as: "reservas",
      });
    }
  }
  Cancha.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      images: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Cancha",
    },
  );
  return Cancha;
};
