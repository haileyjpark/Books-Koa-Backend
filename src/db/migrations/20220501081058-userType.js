module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '유저 타입 id',
      },
      userType: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: '유저 타입 (관리자 / 특별회원 / 일반회원)',
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
    await queryInterface.dropTable('UserTypes');
  },
};
