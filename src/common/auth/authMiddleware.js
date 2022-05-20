const JwtService = require('./jwtService');
const { userRepository, adminUserRepository } = require('../../repository');

// 인가 공통 로직
const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    ctx.throw(401, 'Authorization header is missing');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(ctx, token);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const userAdminAuthorized = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  const user = await userRepository.getById(decodedToken.payload.user)
    || await adminUserRepository.getById(decodedToken.payload.user);

  if (!user) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.userId = user.id;
  return next();
};

// 관리자 권한 부여
const adminAuthorized = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  const user = await adminUserRepository.getById(decodedToken.payload.user);
  if (!user) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.userId = user.id;
  return next();
};

module.exports = { userAdminAuthorized, adminAuthorized };
