/* eslint-disable no-return-await */
const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-parser');

const { ApolloServer } = require('apollo-server-koa');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { resolvers, typeDefs } = require('./graphql');
const { schema } = require('./graphql');

// console.log('resolvers', resolvers);
// console.log('typeDefs', typeDefs);
// console.log('schema', schema);

const router = require('./routes');

const PORT = 4000;

const db = require('./db/models');

module.exports = {
  start: async () => {
    db.sequelize.sync()
      .then(() => console.log('models synced!'))
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

    const app = new Koa();

    app.use(bodyParser());
    app.use(router.routes());

    const httpServer = http.createServer();
    const server = new ApolloServer({
      schema,
      // typeDefs,
      // resolvers,
      csrfPrevention: true,
      context: ({ ctx, next }) => ({ ctx, next }),
      // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
    httpServer.on('request', app.callback());
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
  },
};