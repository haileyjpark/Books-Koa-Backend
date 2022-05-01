const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '유저 타입 id',
    },
    userType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '유저 타입 (관리자 / 특별회원 / 일반회원)',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  UserType.associate = (models) => {
    UserType.hasMany(models.User, {
      foreignKey: 'userTypeId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return UserType;
};
