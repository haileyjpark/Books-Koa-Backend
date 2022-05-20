const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 id 데이터를 담고 있습니다.',
    },
    bookType: {
      type: DataTypes.ENUM('EBOOK', 'PAPER_BOOK', 'AUDIO_BOOK'),
      allowNull: false,
      comment: '세 가지 책 분류를 나타냅니다. (EBOOK, PAPER_BOOK, AUDIO_BOOK)',
    },
    rentalState: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '도서 대출중 여부를 나타냅니다. 대출중일 경우 true, 아닐 경우 false입니다.',
    },
  });
  Book.associate = (models) => {
    Book.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.BookRental, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.BookReturn, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return Book;
};
