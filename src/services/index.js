const userService = require('./users/index');
const bookService = require('./books');
const { rentalService, reservationService } = require('./rental');

module.exports = {
  userService, bookService, rentalService, reservationService,
};
