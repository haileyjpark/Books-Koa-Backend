module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서 예약 목록 테이블의 고유 pk값 데이터를 담고 있습니다.',
      },
      reservationCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '도서 예약 코드 데이터를 담고 있습니다.',
      },
      reservedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '도서 예약일 데이터를 담고 있습니다.',
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
    await queryInterface.dropTable('Reservations');
  },
};
