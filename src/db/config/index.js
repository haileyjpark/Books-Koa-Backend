const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env.development') });
const { env } = process;

const development = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DEVELOPMENT,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  secret: env.SECRET_KEY,
  port: env.DB_PORT,
};

const production = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_PRODUCTION,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
};

const test = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
};

module.exports = { development, production, test };
