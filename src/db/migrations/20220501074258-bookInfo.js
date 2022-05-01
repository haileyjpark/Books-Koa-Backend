module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookInfo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '도서 정보 id',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '카테고리 id',
      },
      ISBN: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'ISBN 번호',
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '도서 제목',
      },
      author: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '도서 저자',
      },
      publisher: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '도서 출판사',
      },
      publicationDate: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '도서 출판일',
      },
      thumbnailImage: {
        type: Sequelize.STRING(2048),
        allowNull: true,
        comment: '도서 표지 이미지',
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '도서 페이지 수',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '도서 정보 설명',
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
