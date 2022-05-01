const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RentalHistory = sequelize.define('RentalHistory', {
    rentalCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 대출 코드',
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 대출일',
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 반납일',
    },
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 반납 연장 횟수',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  RentalHistory.associate = (models) => {
    RentalHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    RentalHistory.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return RentalHistory;
};
