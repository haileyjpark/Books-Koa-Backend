const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define('AdminUser', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: '관리자 id 데이터를 담고 있습니다.',
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '관리자 이름 데이터를 담고 있습니다.',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '관리자 이메일 데이터를 담고 있습니다.',
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '관리자 비밀번호 데이터를 담고 있습니다.',
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '관리자 전화번호 데이터를 담고 있습니다.',
    },
  });
  return AdminUser;
};
