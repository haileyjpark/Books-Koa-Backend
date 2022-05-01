const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ReservationHistory = sequelize.define('ReservationHistory', {
    reservationCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 예약 코드',
    },
    reservationStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 예약 시작일',
    },
    reservationEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 예약 종료일',
    },
    isCheckedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: '대출 여부 (true: 대출 / false: 예약 취소)',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  ReservationHistory.associate = (models) => {
    ReservationHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    ReservationHistory.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return ReservationHistory;
};
