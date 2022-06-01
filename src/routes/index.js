const Router = require('koa-router');

const {
  userRouter, bookRouter, rentalRouter, reservationRouter,
} = require('./api');

const router = new Router();

router.use('', userRouter.routes());
router.use('', bookRouter.routes());
router.use('', rentalRouter.routes());
router.use('', reservationRouter.routes());

module.exports = router;
