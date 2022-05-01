module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RentalHistories', [
      {
        rentalCode: 144837,
        bookId: 4,
        userId: 4,
        rentalDate: new Date(),
        returnDate: new Date(),
        extension: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rentalCode: 145237,
        bookId: 5,
        userId: 5,
        rentalDate: new Date(),
        returnDate: new Date(),
        extension: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RentalHistories', null, {});
  },
};
