const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookRental = sequelize.define('BookRental', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 대출 목록 테이블의 고유 pk값 데이터를 담고 있습니다.',
    },
    rentalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '도서 대출 코드 데이터를 담고 있습니다.',
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '도서 대출일 데이터를 담고 있습니다.',
    },
    returnDueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 반납 예정일 데이터를 담고 있습니다.',
    },
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '도서 반납 연장 횟수 데이터를 담고 있습니다.',
    },
  });
  BookRental.associate = (models) => {
    BookRental.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookRental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookRental;
};
