const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const bookResolver = require('./book');
const bookInfoResolver = require('./bookInfo');

// const composedResolvers = composeResolvers(bookResolver, bookInfoResolver);

// module.exports = composedResolvers;

module.exports = { bookInfoResolver };
