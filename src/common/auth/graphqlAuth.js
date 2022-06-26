const JwtService = require('./jwtService');
const { CustomGQLError, ERROR_CODE } = require('../error');

// 인가 공통 로직
const authorize = async (ctx) => {
  if (!ctx.req.headers?.authorization) {
    throw new CustomGQLError(ERROR_CODE.AUTHORIZATION_INFO_MISSING, 'Authorization header is missing', '[GraphQL/Auth/AUTHORIZATION_INFO_MISSING]');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = JwtService.verify(token);
  return decodedToken;
};

// 사용자 & 관리자 권한 부여
const graphqlUserAdminAuthorized = () => (next) => async (root, args, { ctx }, info) => {
  const decodedToken = await authorize(ctx);
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next(root, args, { ctx }, info);
};

// 관리자 권한 부여
const graphqlAdminAuthorized = () => (next) => async (root, args, { ctx }, info) => {
  const decodedToken = await authorize(ctx);
  if (!decodedToken || decodedToken?.role !== 'ADMIN') {
    throw new CustomGQLError(ERROR_CODE.USER_NOT_ADMIN, 'You don\'t have permission to access.', '[GraphQL/Auth/USER_NOT_ADMIN]');
  }
  ctx.state.userId = decodedToken.id;
  ctx.state.role = decodedToken.role;
  return next(root, args, { ctx }, info);
};

module.exports = { graphqlUserAdminAuthorized, graphqlAdminAuthorized };
