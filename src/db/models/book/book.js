const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 id',
    },
    isCheckedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '도서 대출중 여부',
    },
    isReserved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '도서 예약중 여부',
    },
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  Book.associate = (models) => {
    Book.belongsTo(models.BookInfoId, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.belongsTo(models.BookTypeId, {
      foreignKey: 'bookTypeId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.Rental, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.RentalHistory, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.BookReview, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Book.hasMany(models.BookLike, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return Book;
};
