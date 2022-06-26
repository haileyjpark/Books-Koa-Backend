module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookReviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서 서평 id 데이터를 담고 있습니다.',
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        comment: '도서 서평의 내용 데이터를 담고 있습니다.',
      },
      score: {
        type: Sequelize.DECIMAL(6, 1),
        allowNull: false,
        comment: '도서 서평 평점 데이터를 담고 있습니다. (0.5 ~ 5.0)',
      },
      bookInfoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BookInfo',
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookReviews');
  },
};
