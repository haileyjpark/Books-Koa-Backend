const { mergeTypeDefs } = require('@graphql-tools/merge');
const { gql } = require('apollo-server-koa');
// const { authDirective } = require('../utils');

// const { authDirectiveTypeDefs } = authDirective('auth');

const bookType = require('./book');
const userType = require('./user');

// const rootType = gql`
//         type Query {
//             _:String
//         }
//         type Mutation{
//             _:String
//         }
// `;

const types = [bookType, userType];
const typeDefs = mergeTypeDefs(types);

module.exports = typeDefs;
