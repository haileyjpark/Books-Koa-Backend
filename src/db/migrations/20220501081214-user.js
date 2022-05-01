module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: '유저 id',
      },
      userCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        comment: '유저 코드',
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '사용자 이름',
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '사용자 이메일',
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '사용자 비밀번호',
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '사용자 전화번호',
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: '사용자 주소',
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserType',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '유저 타입 id',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
