module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        bookTypeId: 1,
        bookInfoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bookTypeId: 2,
        bookInfoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bookTypeId: 1,
        bookInfoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
