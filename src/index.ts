import 'reflect-metadata';
import { createConnections } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MySQLresolver } from './resolvers/MySQLresolver';
import { InterventionResolvers } from './resolvers/InterventionResolvers';

(async () => {
  const app = express();
  await createConnections([
  {
    name: 'default',
    type: 'mysql',
    host: process.env.MYSQLHOST || 'localhost',
    port: 3306,
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPW || 'root',
    database: process.env.MYSQLDB || 'app_development',
    synchronize: false,
    logging: true,
    entities: [
      process.env.NODE_ENV === 'development'
        ? './src/entities/MySQL/*.*'
        : './dist/entities/MySQL/*.js',
    ],
  },
  {
    name: 'pg',
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: 5432,
    username: process.env.PGUSER || 'william',
    password: process.env.PGPW || 'root',
    database: process.env.PGDB || 'dwh_development',
    schema: 'public',
    synchronize: false,
    logging: true,
    entities: [
      process.env.NODE_ENV === 'development'
        ? './src/entities/PG/*.*'
        : './dist/entities/PG/*.js',
    ],
  },
]);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MySQLresolver, InterventionResolvers],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({ app, cors: true });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
