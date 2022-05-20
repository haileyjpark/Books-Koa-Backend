/* eslint-disable no-return-await */
const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-parser');

const { ApolloServer, gql } = require('apollo-server-koa');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const typeDefs = require('./graphql/schema/bookInfo');
// const { resolvers } = require('./graphql');
const resolvers = require('./graphql/resolvers/bookInfo');

console.log('=================================================================================');
console.log(resolvers);

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
      typeDefs,
      resolvers,
      csrfPrevention: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
    httpServer.on('request', app.callback());
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
  },
};
