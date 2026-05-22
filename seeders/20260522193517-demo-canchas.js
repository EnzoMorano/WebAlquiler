'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('canchas', [
      {
        name: 'Cancha 1',
        type: 'Futbol 5',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cancha 2',
        type: 'Futbol 5',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cancha 3',
        type: 'Futbol 7',
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('canchas', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
