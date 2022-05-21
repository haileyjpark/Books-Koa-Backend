const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./schema');
const { bookInfoSchema, bookSchema, linkSchema } = require('./schema');


const resolvers = require('./resolvers');

const mergeResolver = mergeResolvers(resolvers);
const mergedReSolvers = Object.values(mergeResolver);

const mergedTypeDefs = mergeTypeDefs(typeDefs.bookInfoSchema);

// const schemas = () => mergeSchemas({
//   schemas: [schema],
//   resolvers: [resolvers],
// });

module.exports = {
  typeDefs, resolvers,
};
