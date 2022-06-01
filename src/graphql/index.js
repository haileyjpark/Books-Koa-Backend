const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { authDirective } = require('./utils');

// const { authDirectiveTransformer } = authDirective('auth');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// schema = authDirectiveTransformer(schema);

module.exports = {
  schema, typeDefs, resolvers,
};
