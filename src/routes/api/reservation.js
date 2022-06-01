const Router = require('koa-router');
const { reservationController } = require('../../controllers/index');
const { userAdminAuthorized, adminAuthorized } = require('../../common/auth/authMiddleware');

const reservationRouter = new Router();

// Admin
reservationRouter.get('/reservations/admin', adminAuthorized, reservationController.getAdminReservations);
reservationRouter.get('/reservations/history/admin', adminAuthorized, reservationController.getAdminOldReservations);

// User
reservationRouter.post('/reservation', userAdminAuthorized, reservationController.createReservation);
reservationRouter.get('/reservations', userAdminAuthorized, reservationController.getUserReservations);
reservationRouter.get('/reservation/:reservationId', userAdminAuthorized, reservationController.getOneReservation);
reservationRouter.delete('/reservation/:reservationId', userAdminAuthorized, reservationController.cancelReservation);

// User - Reservation History
reservationRouter.get('/reservations/history', userAdminAuthorized, reservationController.getUserOldReservations);
reservationRouter.get('/reservation/history/:reservationId', userAdminAuthorized, reservationController.getOneOldReservation);

module.exports = reservationRouter;
