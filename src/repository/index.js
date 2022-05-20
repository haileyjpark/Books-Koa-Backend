const { bookRepository, bookInfoRepository } = require('./books');
const { userRepository, adminUserRepository } = require('./user');
const {
  rentalRepository, returnRepository,
  reservationRepository, deactivatedReservationRepository,
} = require('./rental');

module.exports = {
  userRepository,
  adminUserRepository,
  bookRepository,
  bookInfoRepository,
  rentalRepository,
  returnRepository,
  reservationRepository,
  deactivatedReservationRepository,
};
