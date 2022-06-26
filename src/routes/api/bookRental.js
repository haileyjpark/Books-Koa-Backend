const Router = require('koa-router');
const { rentalController } = require('../../controllers/restApi');
const { userAdminAuthorized, adminAuthorized } = require('../../common/auth');

const rentalRouter = new Router();

// Admin - book-rental
rentalRouter.post('/book-rentals', adminAuthorized, rentalController.createRental);
rentalRouter.get('/book-rentals/admin', adminAuthorized, rentalController.getAdminRentals);

// Admin - book-return
rentalRouter.post('/book-returns', adminAuthorized, rentalController.createBookReturn);
rentalRouter.get('/book-returns/admin', adminAuthorized, rentalController.getAdminReturns);

// User - book-rental
rentalRouter.get('/book-rentals', userAdminAuthorized, rentalController.getUserRentals);
rentalRouter.get('/book-rental/:rentalId', userAdminAuthorized, rentalController.getOneRental);
rentalRouter.patch('/book-rental/:rentalId', userAdminAuthorized, rentalController.extendRental);

// User - book-return
rentalRouter.get('/book-returns', userAdminAuthorized, rentalController.getUserReturns);
rentalRouter.get('/book-return/:rentalId', userAdminAuthorized, rentalController.getOneReturn);

module.exports = rentalRouter;
