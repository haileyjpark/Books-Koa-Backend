const { mergeResolvers } = require('@graphql-tools/merge');

const { bookResolver } = require('./book');
const { userResolver } = require('./user');
const { bookRentalResolver, bookReturnResolver, bookReservationResolver } = require('./rental');

const resolvers = [
  bookResolver,
  userResolver,
  bookRentalResolver,
  bookReturnResolver,
  bookReservationResolver,
];

const mergedResolvers = mergeResolvers(resolvers);

module.exports = mergedResolvers;
