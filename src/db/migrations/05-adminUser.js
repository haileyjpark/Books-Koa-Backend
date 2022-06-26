module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdminUsers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '관리자 id 데이터를 담고 있습니다.',
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '관리자 이름 데이터를 담고 있습니다.',
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '관리자 이메일 데이터를 담고 있습니다.',
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
        comment: '관리자 비밀번호 데이터를 담고 있습니다.',
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '관리자 전화번호 데이터를 담고 있습니다.',
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
    await queryInterface.dropTable('AdminUsers');
  },
};
