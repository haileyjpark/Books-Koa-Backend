const { gql } = require('apollo-server-koa');
// const { mergeSchemas } require('graphql-tools');

const bookSchema = require('./book');
const bookInfoSchema = require('./bookInfo');

module.exports = { bookSchema, bookInfoSchema };
