module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reservations', [
      {
        reservationCode: 1375456,
        bookId: 2,
        userId: 1,
        reservedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reservationCode: 1375457,
        bookId: 1,
        userId: 2,
        reservedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reservationCode: 13754567,
        bookId: 3,
        userId: 3,
        reservedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reservations', null, {});
  },
};
