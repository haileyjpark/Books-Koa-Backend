module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        categoryName: '소설',
      },
      {
        categoryName: '시',
      },
      {
        categoryName: '인문학',
      },
      {
        categoryName: '판타지',
      },
      {
        categoryName: '국내도서',
      },
      {
        categoryName: '해외도서',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
