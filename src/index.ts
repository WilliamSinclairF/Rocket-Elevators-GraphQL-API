import 'reflect-metadata';
import { createConnections } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MySQLresolver } from './resolvers/MySQLresolver';
import { InterventionResolvers } from './resolvers/InterventionResolvers';

(async () => {
  const cors = require('cors');
  const app = express();
  app.use(cors());

  require('dotenv').config({ path: __dirname + '/.env' });

  await createConnections();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MySQLresolver, InterventionResolvers],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
