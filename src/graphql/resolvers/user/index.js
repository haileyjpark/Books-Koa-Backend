const { graphqlUserController } = require('../../../controllers/graphql');

const userResolver = {
  Mutation: {
    signUp: graphqlUserController.signUp,
    adminSignIn: graphqlUserController.adminSignIn,
    userSignIn: graphqlUserController.userSignIn,
    refreshAccessToken: graphqlUserController.refreshAccessToken,
  },
};

module.exports = { userResolver };
