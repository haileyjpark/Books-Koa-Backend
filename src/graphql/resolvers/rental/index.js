const { bookRentalResolver } = require('./bookRental');
const { bookReturnResolver } = require('./bookReturn');
const { bookReservationResolver } = require('./reservation');

module.exports = { bookRentalResolver, bookReturnResolver, bookReservationResolver };
