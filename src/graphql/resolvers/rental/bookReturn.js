const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { graphqlRentalController } = require('../../../controllers/graphql');
const { graphqlUserAdminAuthorized, graphqlAdminAuthorized } = require('../../../common/auth');

const resolvers = {
  Query: {
    getOneReturn: graphqlRentalController.getOneReturn,
    getAdminReturns: graphqlRentalController.getAdminReturns,
    getUserReturns: graphqlRentalController.getUserReturns,
  },
  Mutation: {
    createBookReturn: graphqlRentalController.createBookReturn,
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

const resolversComposition = {
  'Query.getAdminReturns': [graphqlAdminAuthorized()],
  'Mutation.createBookReturn': [graphqlAdminAuthorized()],

  'Query.getOneReturn': [graphqlUserAdminAuthorized()],
  'Query.getUserReturns': [graphqlUserAdminAuthorized()],
};

const bookReturnResolver = composeResolvers(resolvers, resolversComposition);

module.exports = { bookReturnResolver };
