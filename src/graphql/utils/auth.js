const { JwtService } = require('../../common/auth');
const { userRepository, adminUserRepository } = require('../../repository');

const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    ctx.throw(401, 'Authorization header is missing');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(ctx, token);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const userAdminAuthorized = async (ctx) => {
  const decodedToken = await authorize(ctx);
  const userId = decodedToken.payload.user;
  const user = await userRepository.getOne({ userId })
        || await adminUserRepository.getOne({ userId });

  if (!user) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.userId = user.id;
  return user;
};

// 관리자 권한 부여
const adminAuthorized = async (ctx) => {
  const decodedToken = await authorize(ctx);
  const userId = decodedToken.payload.user;
  const user = await adminUserRepository.getOne({ userId });
  if (!user) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.userId = user.id;
  return user;
};

module.exports = { authorize, userAdminAuthorized, adminAuthorized };