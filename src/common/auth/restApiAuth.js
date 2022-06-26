const JwtService = require('./jwtService');
const { CustomError, ERROR_CODE } = require('../error');

// 인가 공통 로직
const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    throw new CustomError(ERROR_CODE.AUTHORIZATION_INFO_MISSING, 'Authorization header is missing', '[restAPI/Auth/AUTHORIZATION_INFO_MISSING]');
  }
  const { accessToken } = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(accessToken);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const userAdminAuthorized = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next();
};

// 관리자 권한 부여
const adminAuthorized = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  if (decodedToken.role !== 'ADMIN') {
    throw new CustomError(ERROR_CODE.USER_NOT_ADMIN, 'You don\'t have permission to access.', '[restAPI/Auth/USER_NOT_ADMIN]');
  }
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next();
};

module.exports = { userAdminAuthorized, adminAuthorized };
