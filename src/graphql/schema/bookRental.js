const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Rental {
        id: Int!
        rentalCode: String!
        book: Book!
        user: User!
        rentalDate: String!
        returnDueDate: String!
        extension: Int!
        createdAt: String!
        updatedAt: String!
    }

    input createRentalInput {
        rentalCode: String!
        bookId: Int!
        userId: String!
    }
    input extendRentalInput {
        rentalId: Int!
        userId: String!
    }
    input rentalQueryInput {
        page: Int!
        limit: Int!
        userId: String
        bookId: Int
    }

    type Query {
        getOneRental(id: Int!): Rental!
        getAdminRentals(input: rentalQueryInput): [Rental!]!
        getUserRentals(input: rentalQueryInput): [Rental!]!
    }

    type Mutation {
        createRental(input: createRentalInput): Rental!
        extendRental(input: extendRentalInput): String!
    }
    `;
