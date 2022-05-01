module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReservationHistories', {
      reservationCode: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: '도서 예약 코드',
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
      reservationStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 예약 시작일',
      },
      reservationEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 예약 종료일',
      },
      isCheckedOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: '대출 여부 (true: 대출 / false: 예약 취소)',
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
    await queryInterface.dropTable('ReservationHistories');
  },
};
