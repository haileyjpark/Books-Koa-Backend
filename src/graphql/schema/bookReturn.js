const { gql } = require('apollo-server-koa');

module.exports = gql`
    type BookReturn {
        id: Int!
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
        getOneReturn(id: Int!): BookReturn!
        getAdminReturns(input: bookReturnQueryInput): [BookReturn!]!
        getUserReturns(input: bookReturnQueryInput): [BookReturn!]!
    }

    type Mutation {
        createBookReturn(input: createBookReturnInput): BookReturn!
    }
    `;
