const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: '유저 id 데이터를 담고 있습니다.',
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '유저 이름 데이터를 담고 있습니다.',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '유저 이메일 데이터를 담고 있습니다.',
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '유저 비밀번호 데이터를 담고 있습니다.',
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '유저 전화번호 데이터를 담고 있습니다.',
    },
    overdueCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '연체 횟수를 나타냅니다.',
    },
    availableRentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '대출 가능한 날짜 정보를 담고 있습니다. 반납이 연체되지 않았을 경우 반납일로 지정됩니다.',
    },
    refreshToken: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: '리프레시 토큰을 저장합니다.',
    },
  });
  User.associate = (models) => {
    User.hasMany(models.BookRental, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.BookReturn, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
    });
    User.hasMany(models.DeactivatedReservation, {
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
  };
  return User;
};
