module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서 id 데이터를 담고 있습니다.',
      },
      bookType: {
        type: Sequelize.ENUM('EBOOK', 'PAPER_BOOK', 'AUDIO_BOOK'),
        allowNull: false,
        comment: '세 가지 책 분류를 나타냅니다. (EBOOK, PAPER_BOOK, AUDIO_BOOK)',
      },
      rentalState: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '도서 대출중 여부를 나타냅니다. 대출중일 경우 true, 아닐 경우 false입니다.',
      },
      bookInfoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BookInfo',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '도서 정보 id 데이터를 담고 있습니다.',
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
    await queryInterface.dropTable('Books');
  },
};
