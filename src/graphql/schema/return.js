const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Return {
        id: ID!
        rentalCode: String!
        Book: Book!
        User: User!
        rentalDate: String!
        returnDueDate: String!
        extension: Int!
    }
    `;
