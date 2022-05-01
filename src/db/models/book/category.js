const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 카테고리 id',
    },
    categoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '도서 카테고리명',
    },
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Category.associate = (models) => {
    Category.hasMany(models.BookInfo, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    Category.hasMany(models.Category, {
      as: 'mainCategory',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  };
  return Category;
};
