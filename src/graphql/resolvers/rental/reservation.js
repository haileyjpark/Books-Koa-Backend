const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { graphqlReservationController } = require('../../../controllers/graphql');
const { graphqlUserAdminAuthorized, graphqlAdminAuthorized } = require('../../../common/auth');

const resolvers = {
  Query: {
    getOneReservation: graphqlReservationController.getOneReservation,
    getAdminReservations: graphqlReservationController.getAdminReservations,
    getUserReservations: graphqlReservationController.getUserReservations,
    getOneOldReservation: graphqlReservationController.getOneOldReservation,
    getAdminOldReservations: graphqlReservationController.getAdminOldReservations,
    getUserOldReservations: graphqlReservationController.getUserOldReservations,
  },
  Mutation: {
    createReservation: graphqlReservationController.createReservation,
    cancelReservation: graphqlReservationController.cancelReservation,
  },
  Reservation: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
  DeactivatedReservation: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
};

const resolversComposition = {
  'Query.getAdminReservations': [graphqlAdminAuthorized()],
  'Query.getAdminOldReservations': [graphqlAdminAuthorized()],

  'Query.getOneReservation': [graphqlUserAdminAuthorized()],
  'Query.getUserReservations': [graphqlUserAdminAuthorized()],
  'Query.getOneOldReservation': [graphqlUserAdminAuthorized()],
  'Query.getUserOldReservations': [graphqlUserAdminAuthorized()],
  'Mutation.createReservation': [graphqlUserAdminAuthorized()],
  'Mutation.cancelReservation': [graphqlUserAdminAuthorized()],
};

const bookReservationResolver = composeResolvers(resolvers, resolversComposition);

module.exports = { bookReservationResolver };
