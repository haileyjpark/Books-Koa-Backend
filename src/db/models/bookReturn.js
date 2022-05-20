const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookReturn = sequelize.define('BookReturn', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 반납 테이블의 고유 pk값 데이터를 담고 있습니다.',
    },
    rentalCode: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      comment: '도서 대출 코드 데이터를 담고 있습니다.',
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 대출일 데이터를 담고 있습니다.',
    },
    returnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: '도서 반납일 데이터를 담고 있습니다.',
    },
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 반납 연장 횟수 데이터를 담고 있습니다.',
    },
  }, {
    timestamps: false,
  });
  BookReturn.associate = (models) => {
    BookReturn.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookReturn.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookReturn;
};
