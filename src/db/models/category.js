const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '도서 카테고리 id 데이터를 담고 있습니다.',
    },
    categoryName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '도서 카테고리명 데이터를 담고 있습니다.',
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '도서 메인 - 서브 카테고리 관계 (셀프 조인)',
    },
  }, {
    timestamps: false,
  });
  Category.associate = (models) => {
    Category.hasMany(models.BookInfo, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    Category.hasMany(models.Category, {
      as: 'subCategory',
      foreignKey: 'parent',
      onDelete: 'cascade',
    });
    Category.belongsTo(models.Category, {
      foreignKey: 'parent',
      onDelete: 'cascade',
    });
  };
  return Category;
};
