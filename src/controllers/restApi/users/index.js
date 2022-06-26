const { userService, authService } = require('../../../services/restApi');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 회원가입
const signUp = async (ctx) => {
  try {
    // 정규표현식 로직 추가 필요
    if (!ctx.request.body.email) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the email');
    }
    if (!ctx.request.body.password) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the password');
    }
    const createdUser = await userService.findOrCreateUser(ctx.request.body);
    if (createdUser) {
      ctx.body = 'Signup successful!';
    }
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 관리자 로그인
const adminSignIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    if (!email) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the email');
    }
    if (!password) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the password');
    }
    const token = await userService.adminSignInService(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 유저 로그인
const userSignIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    if (!email) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the email');
    }
    if (!password) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the password');
    }
    const token = await userService.userSignInService(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

const refreshAccessToken = async (ctx) => {
  try {
    if (!ctx.request.body.accessToken || !ctx.request.body.refreshToken) {
      throw new CustomError(ERROR_CODE.AUTHORIZATION_INFO_MISSING, 'please provide the Authorization information');
    }
    const token = await authService.refreshAccessToken(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  signUp, adminSignIn, userSignIn, refreshAccessToken,
};
