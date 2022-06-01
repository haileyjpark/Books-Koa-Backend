const { graphqlReservationController } = require('../../controller');

const bookReservationResolver = {
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
    book: async (parent, _, context) => {
      const book = context.loaders.bookByIdLoader.load(parent.bookId);
      return book;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
  DeactivatedReservation: {
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

module.exports = { bookReservationResolver };
