module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        userCode: 123452234634,
        address: '서울시 영등포구',
        email: 'hailey@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010010101010',
        userName: '박정현',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userCode: 12334534634634,
        address: '경기도 화성시',
        email: 'sora@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '0108907784545',
        userName: '강소라',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userCode: 34456763464634,
        address: '경기도 파주시',
        email: 'hareem@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010056758430',
        userName: '송하림',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userCode: 12314574573434634,
        address: '서울시 강남구',
        email: 'bothsides@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010045733646',
        userName: '양진영',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userCode: 12334764563434634,
        address: '서울시 관악구',
        email: 'wbHeo@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010045733646',
        userName: '허웅범',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
