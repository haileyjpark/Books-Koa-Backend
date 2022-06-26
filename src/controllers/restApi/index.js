const bookController = require('./books');
const userController = require('./users');
const { rentalController, reservationController } = require('./rentals');

module.exports = {
  bookController, userController, rentalController, reservationController,
};
