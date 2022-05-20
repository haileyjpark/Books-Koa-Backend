const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AdminUsers', [
      {
        id: 'fa437d57-015a-40e9-b72c-980fd889a313',
        email: 'haileyjPark@barogo.com',
        password: '$2b$10$a./IQOZVeySkM00bZ6j1NutQV5NKJdO740DGfJOWrnKTkTJYcwF7y',
        userName: '박정현',
        phoneNumber: '01098765679',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'jin@barogo.com',
        password: '$2b$10$vCiBh/GQxhwCTgCadouGwO0cmStqvdjo3FrcoGUt2dJlvYr5cLbI2',
        userName: '양진영',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AdminUsers', null, {});
  },
};
