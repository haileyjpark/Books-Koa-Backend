const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'd784667e-97db-4cf2-8599-ceb309010e29',
        email: 'soraKang2@barogo.com',
        password: '$2b$10$XJZt/eAEbNEqoKxg3CaQBern8m83f4rrsrKEbcanzSZb9cHRDmEMO',
        userName: '강소라',
        phoneNumber: '01098765671',
        availableRentalDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '090786c4-ac96-4cb9-8b87-54b6a14100a6',
        email: 'woong@barogo.com',
        password: '$2b$10$E/R72y99SeNuiRVJaCM0tOK.YYbPSR79yHgFjsoOC2aW2JFHw2vGa',
        userName: '허웅범',
        phoneNumber: '01011122232',
        availableRentalDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'haha@barogo.com',
        password: '$2b$10$Znsug60.Ls5p4Qhm3bL9SevfsB.h76TdpFdsIq9ngteJU/tvNlhmW',
        userName: '송하림',
        phoneNumber: '01013332221',
        availableRentalDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
