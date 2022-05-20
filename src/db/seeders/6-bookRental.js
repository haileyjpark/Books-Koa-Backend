const createDate = (number) => {
  const today = new Date();
  const returnDueDate = new Date(today);
  return new Date(returnDueDate.setDate(today.getDate() + number));
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookRentals', [
      {
        rentalCode: 'ABCD1234',
        userId: '090786c4-ac96-4cb9-8b87-54b6a14100a6',
        bookId: 1,
        extension: 0,
        rentalDate: createDate(-50),
        returnDueDate: createDate(-40),
        createdAt: createDate(-50),
        updatedAt: createDate(-50),
      },
      {
        rentalCode: 'ABCD1235',
        userId: '090786c4-ac96-4cb9-8b87-54b6a14100a6',
        bookId: 2,
        extension: 0,
        rentalDate: createDate(-30),
        returnDueDate: createDate(-20),
        createdAt: createDate(-30),
        updatedAt: createDate(-30),
      },
      {
        rentalCode: 'ABCD1236',
        userId: '090786c4-ac96-4cb9-8b87-54b6a14100a6',
        bookId: 3,
        extension: 0,
        rentalDate: createDate(-40),
        returnDueDate: createDate(-30),
        createdAt: createDate(-40),
        updatedAt: createDate(-40),
      },
      {
        rentalCode: 'ABCD1237',
        userId: '090786c4-ac96-4cb9-8b87-54b6a14100a6',
        bookId: 4,
        extension: 0,
        rentalDate: createDate(-20),
        returnDueDate: createDate(-10),
        createdAt: createDate(-20),
        updatedAt: createDate(-20),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookRentals', null, {});
  },
};
