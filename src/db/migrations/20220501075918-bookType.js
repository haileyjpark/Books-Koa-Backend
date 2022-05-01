module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '도서 타입 id',
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '도서 타입 (ebook / paper book / audio book)',
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
    await queryInterface.dropTable('BookTypes');
  },
};
