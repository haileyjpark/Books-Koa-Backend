module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookReturns', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서 반납 테이블의 고유 pk값 데이터를 담고 있습니다.',
      },
      rentalCode: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
        comment: '도서 대출 코드 데이터를 담고 있습니다.',
      },
      rentalDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 대출일 데이터를 담고 있습니다.',
      },
      returnDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        comment: '도서 반납일 데이터를 담고 있습니다.',
      },
      extension: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '도서 반납 연장 횟수 데이터를 담고 있습니다.',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
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
    await queryInterface.dropTable('BookReturns');
  },
};
