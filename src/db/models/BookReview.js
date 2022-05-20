const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookReview = sequelize.define('BookReview', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 서평 id 데이터를 담고 있습니다.',
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: '도서 서평의 내용 데이터를 담고 있습니다.',
    },
    score: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: false,
      comment: '도서 서평 평점 데이터를 담고 있습니다. (0.5 ~ 5.0)',
    },
  });
  BookReview.associate = (models) => {
    BookReview.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookReview.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookReview;
};
