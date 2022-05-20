const Router = require('koa-router');

const userRouter = require('./api/user');
const bookRouter = require('./api/books');
const rentalRouter = require('./api/bookRental');

const router = new Router();

router.use('', userRouter.routes());
router.use('', bookRouter.routes());
router.use('', rentalRouter.routes());

module.exports = router;
