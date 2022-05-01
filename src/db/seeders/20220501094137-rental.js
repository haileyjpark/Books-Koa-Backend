module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rentals', [
      {
        rentalCode: 1327637,
        bookId: 2,
        userId: 1,
        rentalDate: new Date(),
        returnDueDate: new Date(),
        extension: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rentalCode: 1334767,
        bookId: 1,
        userId: 2,
        rentalDate: new Date(),
        returnDueDate: new Date(),
        extension: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rentalCode: 1333537,
        bookId: 3,
        userId: 3,
        rentalDate: new Date(),
        returnDueDate: new Date(),
        extension: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rentals', null, {});
  },
};
