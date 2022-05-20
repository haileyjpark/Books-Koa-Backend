const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookLike = sequelize.define('BookLike', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 찜하기 id 데이터를 담고 있습니다.',
    },
  }, {
    timestamps: false,
  });
  BookLike.associate = (models) => {
    BookLike.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookLike.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookLike;
};
