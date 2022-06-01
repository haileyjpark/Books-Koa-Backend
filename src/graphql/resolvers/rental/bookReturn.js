const { graphqlRentalController } = require('../../controller');

const bookReturnResolver = {
  Query: {
    getOneReturn: graphqlRentalController.getOneReturn,
    getAdminReturns: graphqlRentalController.getAdminReturns,
    getUserReturns: graphqlRentalController.getUserReturns,
  },
  Mutation: {
    createBookReturns: graphqlRentalController.createBookReturns,
  },
  BookReturn: {
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

module.exports = { bookReturnResolver };
