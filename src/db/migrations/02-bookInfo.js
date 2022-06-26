module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookInfo', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '도서 정보 id 데이터를 담고 있습니다.',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '카테고리 id 데이터를 담고 있습니다.',
      },
      ISBN: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'ISBN 번호 데이터를 담고 있습니다.',
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '도서 제목 데이터를 담고 있습니다.',
      },
      author: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '도서 저자 데이터를 담고 있습니다.',
      },
      publisher: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '도서 출판사 데이터를 담고 있습니다.',
      },
      publicationDate: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: '도서 출판일 데이터를 담고 있습니다.',
      },
      thumbnailImage: {
        type: Sequelize.STRING(2048),
        allowNull: true,
        comment: '도서 표지 이미지 데이터를 담고 있습니다.',
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '도서 페이지 수 데이터를 담고 있습니다.',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '도서 정보 설명 데이터를 담고 있습니다.',
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
    await queryInterface.dropTable('BookInfo');
  },
};
