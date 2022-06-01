// const { composeResolvers } = require('@graphql-tools/resolvers-composition');
// const composedResolvers = composeResolvers(bookResolver, bookInfoResolver);
// module.exports = composedResolvers;

const { mergeResolvers } = require('@graphql-tools/merge');

const { bookResolver } = require('./book');
const userResolver = require('./user');

const resolvers = [bookResolver, userResolver];
const mergedResolvers = mergeResolvers(resolvers);

module.exports = mergedResolvers;
