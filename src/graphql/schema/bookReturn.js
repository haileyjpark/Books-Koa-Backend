const { gql } = require('apollo-server-koa');

module.exports = gql`
    type BookReturn {
        id: ID!
        rentalCode: String!
        book: Book!
        user: User!
        rentalDate: String!
        returnDueDate: String!
        extension: Int!
    }

    input bookReturnQueryInput {
        page: Int!
        limit: Int!
        userId: String
        bookId: Int
    }
    input createBookReturnInput {
        rentalCode: String!
        bookId: Int!
        userId: String!
    }

    type Query {
        getOneReturn(id: ID!): BookReturn!
        getAdminReturns(input: bookReturnQueryInput): [BookReturn!]!
        getUserReturns(input: bookReturnQueryInput): [BookReturn!]!
    }

    type Mutation {
        createBookReturns(input: createBookReturnInput): [BookReturn]!
    }
    `;
