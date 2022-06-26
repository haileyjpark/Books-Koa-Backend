module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '유저 id 데이터를 담고 있습니다.',
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '유저 이름 데이터를 담고 있습니다.',
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '유저 이메일 데이터를 담고 있습니다.',
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
        comment: '유저 비밀번호 데이터를 담고 있습니다.',
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '유저 전화번호 데이터를 담고 있습니다.',
      },
      overdueCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '연체 횟수를 나타냅니다.',
      },
      availableRentalDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '대출 가능한 날짜 정보를 담고 있습니다. 반납이 연체되지 않았을 경우 반납일로 지정됩니다.',
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
