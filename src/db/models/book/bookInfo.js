const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define('BookInfo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 정보 id',
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'ISBN 번호',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '도서 제목',
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '도서 저자',
    },
    publisher: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '도서 출판사',
    },
    publicationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '도서 출판일',
    },
    thumbnailImage: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      comment: '도서 표지 이미지',
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 페이지 수',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '도서 정보 설명',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  BookInfo.associate = (models) => {
    BookInfo.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookInfo.hasMany(models.Book, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookInfo;
};
