const { graphqlRentalController } = require('../../controller');

const bookRentalResolver = {
  Query: {
    getAdminRentals: graphqlRentalController.getAdminRentals,
    getUserRentals: graphqlRentalController.getUserRentals,
    getOneRental: graphqlRentalController.getOneRental,
  },
  Mutation: {
    createRentals: graphqlRentalController.createRentals,
    extendRental: graphqlRentalController.extendRental,
  },
  Rental: {
    book: async (parent, _, context) => {
      const book = context.loaders.bookByIdLoader.load(parent.bookId);
      return book;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
};

module.exports = { bookRentalResolver };
