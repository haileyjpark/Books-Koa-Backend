module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReservationHistories', [
      {
        reservationCode: 1375246,
        bookId: 4,
        userId: 4,
        reservationStartDate: new Date(),
        reservationEndDate: new Date(),
        isCheckedOut: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reservationCode: 1375346,
        bookId: 5,
        userId: 5,
        reservationStartDate: new Date(),
        reservationEndDate: new Date(),
        isCheckedOut: true,
        reservedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ReservationHistories', null, {});
  },
};
