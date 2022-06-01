const userRouter = require('./user');
const bookRouter = require('./books');
const rentalRouter = require('./bookRental');
const reservationRouter = require('./reservation');

module.exports = {
  userRouter, bookRouter, rentalRouter, reservationRouter,
};
