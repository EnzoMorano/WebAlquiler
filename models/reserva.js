'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reserva.belongsTo(models.Cancha, { foreignKey: "fieldId", as: "cancha" })
    }
  }
  Reserva.init({
    date: DataTypes.DATEONLY,
    timeSlot: DataTypes.STRING,
    clientName: DataTypes.STRING,
    clientDni: DataTypes.STRING,
    fieldId: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
    amountPaid: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};