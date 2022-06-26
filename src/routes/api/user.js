const Router = require('koa-router');
const { userController } = require('../../controllers/restApi');

const userRouter = new Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/adminSignIn', userController.adminSignIn);
userRouter.post('/userSignIn', userController.userSignIn);
userRouter.post('/refreshToken', userController.refreshAccessToken);

module.exports = userRouter;
