module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'refreshToken', {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: '리프레시 토큰을 저장합니다.',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'refreshToken');
  },
};
