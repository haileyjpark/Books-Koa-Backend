const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservationCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 예약 코드',
    },
    reservedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '도서 예약일',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return Reservation;
};
