const path = require('path');
const dotenv = require('dotenv');

const envFiles = {
  development: '.env.dev',
  test: '.env.test',
  production: '.env',
};

dotenv.config({
  path: `${path.resolve(process.cwd())}/${envFiles[`${process.env.NODE_ENV || 'development'}`]}`,
});
