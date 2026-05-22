'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      timeSlot: {
        type: Sequelize.STRING
      },
      clientName: {
        type: Sequelize.STRING
      },
      clientDni: {
        type: Sequelize.STRING
      },
      fieldId: {
        type: Sequelize.INTEGER
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      amountPaid: {
        type: Sequelize.DECIMAL
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservas');
  }
};