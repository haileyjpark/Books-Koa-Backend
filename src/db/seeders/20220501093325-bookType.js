module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookTypes', [
      {
        type: 'ebook',
      },
      {
        type: 'paper book',
      },
      {
        type: 'audio book',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookTypes', null, {});
  },
};
