module.exports = [
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
];
