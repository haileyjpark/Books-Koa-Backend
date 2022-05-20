const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const DeactivatedReservation = sequelize.define('DeactivatedReservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '예약 기록 테이블의 고유 pk값 데이터를 담고 있습니다. (대출이 되었거나 예약이 취소되어 예약이 종료된 도서의 예약 기록 테이블입니다.)',
    },
    reservationCode: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      comment: '도서 예약 코드 데이터를 담고 있습니다.',
    },
    reservationStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 예약 시작일 데이터를 담고 있습니다.',
    },
    reservationEndDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: '도서 예약 종료일 데이터를 담고 있습니다. (예약 취소일 또는 도서 대출일)',
    },
    state: {
      type: DataTypes.ENUM('RENTED', 'CANCELLED'),
      allowNull: false,
      comment: '예약이 종료된 사유이자 상태를 나타냅니다. 대출이 되어서 예약이 종료된 경우 RENTED, 예약이 취소되어 종료된 경우 CANCELLED입니다.)',
    },
  }, {
    timestamps: false,
  });
  DeactivatedReservation.associate = (models) => {
    DeactivatedReservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    DeactivatedReservation.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return DeactivatedReservation;
};
