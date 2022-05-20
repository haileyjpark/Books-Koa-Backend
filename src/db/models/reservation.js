const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 예약 목록 테이블의 고유 pk값 데이터를 담고 있습니다.',
    },
    reservationCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '도서 예약 코드 데이터를 담고 있습니다.',
    },
    reservedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '도서 예약일 데이터를 담고 있습니다.',
    },
  });
  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Reservation.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return Reservation;
};
