const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookType = sequelize.define('BookType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 타입 id',
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '도서 타입 (ebook / paper book / audio book)',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  BookType.associate = (models) => {
    BookType.hasMany(models.Book, {
      foreignKey: 'bookTypeId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookType;
};
