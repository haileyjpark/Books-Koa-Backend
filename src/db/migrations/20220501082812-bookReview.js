module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookReviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: '도서 서평 id',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Book',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '도서 id',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '유저 id',
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        comment: '도서 서평 내용',
      },
      score: {
        type: Sequelize.DECIMAL(6, 1),
        allowNull: false,
        comment: '도서 서평 평점',
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
