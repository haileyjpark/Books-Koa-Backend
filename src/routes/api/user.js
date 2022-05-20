const Router = require('koa-router');
const { userController } = require('../../controllers');

const userRouter = new Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
