const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: '유저 id',
    },
    userCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      comment: '유저 코드',
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '유저 이름',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '유저 이메일',
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '유저 비밀번호',
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '유저 전화번호',
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: '유저 주소',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
  User.associate = (models) => {
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.RentalHistory, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.BookReview, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.BookLike, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.belongsTo(models.UserType, {
      foreignKey: 'userTypeId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
  };
  return User;
};
