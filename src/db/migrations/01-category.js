module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '도서 카테고리 id 데이터를 담고 있습니다.',
      },
      categoryName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '도서 카테고리명 데이터를 담고 있습니다.',
      },
      parent: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '메인 카테고리 id 데이터를 담고 있습니다.',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  },
};
