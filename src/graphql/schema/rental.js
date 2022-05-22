const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Rental {
        id: ID!
        rentalCode: String!
        Book: Book!
        User: User!
        rentalDate: String!
        returnDueDate: String!
        extension: Int!
        createdAt: String!
        updatedAt: String!
    }

    input createRentalInput {
        rentalCode: String!
        bookId: Int!
        userId: Int!
    }

    input rentalQueryInput {
        page: Int
        limit: Int
        userId: Int
    }

    type Query {
        rental(id: ID!): Rental!
        rentals(input: rentalQueryInput): [Rental!]!
    }

    type Mutation {
        createRentals(input: createRentalInput): Rental!
        extendRental: Rental!
    }
    `;
