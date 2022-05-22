const Router = require('koa-router');
const { rentalController, reservationController } = require('../../controllers/index');
const { userAdminAuthorized, adminAuthorized } = require('../../common/auth/authMiddleware');

const rentalRouter = new Router();

rentalRouter.post('/book-rentals', adminAuthorized, rentalController.createRentals);
rentalRouter.get('/book-rentals/admin', adminAuthorized, rentalController.getAdminRentals);
rentalRouter.get('/book-rentals/user', userAdminAuthorized, rentalController.getUserRentals);
rentalRouter.get('/book-rental/:rentalId', userAdminAuthorized, rentalController.getSingleRental);
rentalRouter.patch('/book-rental/:rentalId', userAdminAuthorized, rentalController.extendRental);

rentalRouter.post('/book-returns', adminAuthorized, rentalController.createBookReturns);
rentalRouter.get('/book-returns/admin', adminAuthorized, rentalController.getAdminReturns);
rentalRouter.get('/book-returns/user', userAdminAuthorized, rentalController.getUserReturns);
rentalRouter.get('/book-return/:rentalId', userAdminAuthorized, rentalController.getSingleReturn);

rentalRouter.post('/reservation/:bookInfoId', userAdminAuthorized, reservationController.createReservation);
rentalRouter.get('/reservations/admin', adminAuthorized, reservationController.getAdminReservations);
rentalRouter.get('/reservations/user', userAdminAuthorized, reservationController.getUserReservations);
rentalRouter.get('/reservation/:reservationId', userAdminAuthorized, reservationController.getSingleReservation);
rentalRouter.delete('/reservation/:bookInfoId', userAdminAuthorized, reservationController.cancelReservation);

rentalRouter.get('/reservations/history/admin', adminAuthorized, reservationController.getAdminOldReservations);
rentalRouter.get('/reservations/history/user', userAdminAuthorized, reservationController.getUserOldReservations);
rentalRouter.get('/reservation/history/:reservationId', userAdminAuthorized, reservationController.getSingleOldReservation);

module.exports = rentalRouter;
