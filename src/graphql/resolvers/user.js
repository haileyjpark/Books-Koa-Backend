const { userService } = require('../../services');

module.exports = {
  Mutation: {
    signUp: async (root, args, context) => {
      const user = await userService.findOrCreateUser(args.input);
      return 'Signup successful!';
    },
    signIn: async (root, args, context) => {
      const user = await userService.signInService(args.input);
      return user;
    },
  },
};