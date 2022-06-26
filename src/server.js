const Koa = require('koa');
const bodyParser = require('koa-parser');
const http = require('http');
const { ApolloServer } = require('apollo-server-koa');
const depthLimit = require('graphql-depth-limit');
const router = require('./routes');
const {
  errorHandler, errorHandlerGraphQL, setHttpPlugin,
} = require('./common/error');
const db = require('./db/models');

const { resolvers, typeDefs } = require('./graphql');
const loaders = require('./graphql/resolvers/loaders');

const port = process.env.PORT || 4000;

const app = new Koa();

const startServer = async () => {
  app.use(errorHandler);
  app.use(bodyParser());
  app.use(router.routes());

  db.sequelize.sync()
    .then(() => console.log('models synced!'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    validationRules: [depthLimit(5)],
    context: ({ ctx, next }) => ({
      ctx,
      next,
      loaders,
    }),
    cache: 'bounded',
    formatError: errorHandlerGraphQL,
    // plugins: [setHttpPlugin],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.on('request', app.callback());
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return { server, app };
};

module.exports = { startServer };
