const Router = require('koa-router');
const { rentalController } = require('../../controllers/index');
const { userAdminAuthorized, adminAuthorized } = require('../../common/auth/authMiddleware');

const rentalRouter = new Router();

// Admin - book-rental
rentalRouter.post('/book-rentals', adminAuthorized, rentalController.createRentals);
rentalRouter.get('/book-rentals/admin', adminAuthorized, rentalController.getAdminRentals);

// Admin - book-return
rentalRouter.post('/book-returns', adminAuthorized, rentalController.createBookReturns);
rentalRouter.get('/book-returns/admin', adminAuthorized, rentalController.getAdminReturns);

// User - book-rental
rentalRouter.get('/book-rentals', userAdminAuthorized, rentalController.getUserRentals);
rentalRouter.get('/book-rental/:rentalId', userAdminAuthorized, rentalController.getOneRental);
rentalRouter.patch('/book-rental/:rentalId', userAdminAuthorized, rentalController.extendRental);

// User - book-return
rentalRouter.get('/book-returns', userAdminAuthorized, rentalController.getUserReturns);
rentalRouter.get('/book-return/:rentalId', userAdminAuthorized, rentalController.getOneReturn);

module.exports = rentalRouter;
