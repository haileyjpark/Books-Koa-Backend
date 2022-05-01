const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    rentalCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '도서 대출 코드',
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '도서 대출일',
    },
    returnDueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 반납 예정일',
    },
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '도서 반납 연장 횟수',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  Rental.associate = (models) => {
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    Rental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return Rental;
};
