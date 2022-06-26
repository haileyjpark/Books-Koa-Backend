const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { graphqlRentalController } = require('../../../controllers/graphql');
const { graphqlUserAdminAuthorized, graphqlAdminAuthorized } = require('../../../common/auth');

const resolvers = {
  Query: {
    getAdminRentals: graphqlRentalController.getAdminRentals,
    getUserRentals: graphqlRentalController.getUserRentals,
    getOneRental: graphqlRentalController.getOneRental,
  },
  Mutation: {
    createRental: graphqlRentalController.createRental,
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

const resolversComposition = {
  'Query.getAdminRentals': [graphqlAdminAuthorized()],
  'Mutation.createRental': [graphqlAdminAuthorized()],

  'Query.getUserRentals': [graphqlUserAdminAuthorized()],
  'Query.getOneRental': [graphqlUserAdminAuthorized()],
  'Mutation.extendRental': [graphqlUserAdminAuthorized()],
};

const bookRentalResolver = composeResolvers(resolvers, resolversComposition);

module.exports = { bookRentalResolver };
