const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define('BookInfo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 정보 id 데이터를 담고 있습니다.',
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      comment: 'ISBN 번호 데이터를 담고 있습니다.',
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '도서 제목 데이터를 담고 있습니다.',
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '도서 저자 데이터를 담고 있습니다.',
    },
    publisher: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '도서 출판사 데이터를 담고 있습니다.',
    },
    publicationDate: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: '도서 출판일 데이터를 담고 있습니다.',
    },
    thumbnailImage: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      comment: '도서 표지 이미지 데이터를 담고 있습니다.',
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 페이지 수 데이터를 담고 있습니다.',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '도서 정보 설명 데이터를 담고 있습니다. (목차, 프롤로그 내용 등)',
    },
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
    BookInfo.hasMany(models.BookReview, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookInfo.hasMany(models.BookLike, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookInfo.hasMany(models.Reservation, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    BookInfo.hasMany(models.DeactivatedReservation, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return BookInfo;
};
