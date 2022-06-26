const graphqlBookController = require('./book');
const graphqlUserController = require('./user');
const { graphqlRentalController, graphqlReservationController } = require('./rental');

module.exports = {
  graphqlBookController,
  graphqlUserController,
  graphqlRentalController,
  graphqlReservationController,
};
