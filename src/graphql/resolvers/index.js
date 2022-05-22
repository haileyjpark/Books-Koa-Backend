const { mergeResolvers } = require('@graphql-tools/merge');

const bookResolver = require('./book');
const userResolver = require('./user');
const rentalResolver = require('./rental');
// const reservationResolver = require('./reservation');
// const returnResolver = require('./return');

const resolvers = [bookResolver, userResolver, rentalResolver];
const mergedResolvers = mergeResolvers(resolvers);

module.exports = mergedResolvers;

// const { composeResolvers } = require('@graphql-tools/resolvers-composition');
// const composedResolvers = composeResolvers(bookResolver, bookInfoResolver);
// module.exports = composedResolvers;