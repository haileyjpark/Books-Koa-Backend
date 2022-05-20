module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        categoryName: '국내도서',
      },
      {
        categoryName: '해외도서',
      },
      {
        categoryName: '소설/시/희곡',
        parent: 1,
      },
      {
        categoryName: '인문학',
        parent: 1,
      },
      {
        categoryName: '인문/사회',
        parent: 1,
      },
      {
        categoryName: '판타지',
        parent: 1,
      },
      {
        categoryName: '테마소설',
        parent: 3,
      },
      {
        categoryName: '러시아소설',
        parent: 3,
      },
      {
        categoryName: '시/희곡',
        parent: 3,
      },
      {
        categoryName: '서양철학',
        parent: 4,
      },
      {
        categoryName: '동양철학',
        parent: 4,
      },
      {
        categoryName: '심리/철학',
        parent: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
