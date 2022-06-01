const { mergeTypeDefs } = require('@graphql-tools/merge');

const bookType = require('./book');
const userType = require('./user');
const bookRentalType = require('./bookRental');
const bookReturnType = require('./bookReturn');
const reservationType = require('./reservation');

const types = [bookType, userType, bookRentalType, bookReturnType, reservationType];
const typeDefs = mergeTypeDefs(types);

module.exports = typeDefs;
