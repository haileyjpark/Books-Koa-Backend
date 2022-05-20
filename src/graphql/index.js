const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./schema');
const { bookInfoSchema, bookSchema, linkSchema } = require('./schema');

console.log('====================================');
console.log('typeDefsxsdsfshsfghn;sKdfj', typeDefs);
console.log('typeDefs.bookSchema', typeDefs.bookSchema);

const resolvers = require('./resolvers');

const mergeResolver = mergeResolvers(resolvers);
const mergedReSolvers = Object.values(mergeResolver);
console.log('====================================');
console.log('resolvers', resolvers);
console.log('mergedReSolvers', mergedReSolvers);

const mergedTypeDefs = mergeTypeDefs(typeDefs.bookInfoSchema);

console.log('==========?????????????????????????????????====');
console.log('mergedTypeDefs', mergedTypeDefs);
console.log('==========!!!!!!!!!!!!!!!!!!!!!!!!???????====');

// const schemas = () => mergeSchemas({
//   schemas: [schema],
//   resolvers: [resolvers],
// });

module.exports = {
  typeDefs, resolvers,
};
