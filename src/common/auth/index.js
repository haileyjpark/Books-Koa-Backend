const JwtService = require('./jwtService');
const { userAdminAuthorized, adminAuthorized } = require('./restApiAuth');
const { graphqlUserAdminAuthorized, graphqlAdminAuthorized } = require('./graphqlAuth');

module.exports = {
  JwtService,
  userAdminAuthorized,
  adminAuthorized,
  graphqlUserAdminAuthorized,
  graphqlAdminAuthorized,
};
