module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeactivatedReservation', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '예약 기록 테이블의 고유 pk값 데이터를 담고 있습니다. (대출이 되었거나 예약이 취소되어 예약이 종료된 도서의 예약 기록 테이블입니다.)',
      },
      reservationCode: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
        comment: '도서 예약 코드 데이터를 담고 있습니다.',
      },
      reservationStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 예약 시작일 데이터를 담고 있습니다.',
      },
      reservationEndDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        comment: '도서 예약 종료일 데이터를 담고 있습니다. (예약 취소일 또는 도서 대출일)',
      },
      state: {
        type: Sequelize.ENUM('RENTED', 'CANCELLED'),
        allowNull: false,
        comment: '예약이 종료된 사유이자 상태를 나타냅니다. 대출이 되어서 예약이 종료된 경우 RENTED, 예약이 취소되어 종료된 경우 CANCELLED입니다.)',
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeactivatedReservation');
  },
};
