const { userService, authService } = require('./users');
const bookService = require('./books');
const { rentalService, reservationService } = require('./rental');

module.exports = {
  userService, authService, bookService, rentalService, reservationService,
};
