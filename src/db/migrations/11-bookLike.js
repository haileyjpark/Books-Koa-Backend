module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookLikes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서 찜하기 id 데이터를 담고 있습니다.',
      },
      bookInfoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BookInfos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '도서 id 데이터를 담고 있습니다.',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '유저 id 데이터를 담고 있습니다.',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookLikes');
  },
};
