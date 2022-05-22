const { mergeTypeDefs } = require('@graphql-tools/merge');

const bookType = require('./book');
const userType = require('./user');
const rentalType = require('./rental');
const returnType = require('./return');
const reservationType = require('./reservation');

const types = [bookType, userType, rentalType, returnType, reservationType];
const typeDefs = mergeTypeDefs(types);

module.exports = typeDefs;
