const rentalRepository = require('./bookRental');
const returnRepository = require('./bookReturn');
const reservationRepository = require('./reservation');
const deactivatedReservationRepository = require('./deactivatedReservation');

module.exports = {
  rentalRepository,
  returnRepository,
  reservationRepository,
  deactivatedReservationRepository,
};
