const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookReview = sequelize.define('BookReview', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 서평 id',
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: '도서 서평 내용',
    },
    score: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: false,
      comment: '도서 서평 평점',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  BookReview.associate = (models) => {
    BookReview.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookReview.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookReview;
};
