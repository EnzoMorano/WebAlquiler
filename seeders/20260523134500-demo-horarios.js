'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Horarios', [
      {
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '21:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 2,
        startTime: '09:00',
        endTime: '21:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 3,
        startTime: '09:00',
        endTime: '21:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 4,
        startTime: '09:00',
        endTime: '21:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 5,
        startTime: '09:00',
        endTime: '21:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 6,
        startTime: '09:00',
        endTime: '23:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dayOfWeek: 0,
        startTime: '09:00',
        endTime: '23:00',
        slotDuration: 60,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Horarios', {
      dayOfWeek: { [Sequelize.Op.in]: [0, 1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
