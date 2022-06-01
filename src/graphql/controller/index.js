const graphqlBookController = require('./book');
const graphqlRentalController = require('./bookRental');
const graphqlReservationController = require('./reservation');

module.exports = {
  graphqlBookController, graphqlRentalController, graphqlReservationController,
};
