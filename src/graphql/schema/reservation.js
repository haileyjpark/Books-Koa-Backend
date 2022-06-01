const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Reservation {
        id: ID!
        reservationCode: String!
        book: Book!
        user: User!
        reservationDate: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type DeactivatedReservation {
        id: ID!
        reservationCode: String!
        book: Book!
        user: User!
        reservationStartDate: String!
        reservationEndDate: String!
        state: state!
    }
    
    enum state {
        RENTED
        CANCELLED
    }

    input createReservationInput {
        reservationCode: String!
        bookInfoId: Int!
    }
    input ReservationQueryInput {
        page: Int!
        limit: Int!
        userId: String
        bookInfoId: Int
    }

    type Query {
        getOneReservation(id: ID!): Reservation!
        getAdminReservations(input: rentalQueryInput): [Reservation]!
        getUserReservations(input: rentalQueryInput): [Reservation]!
        getOneOldReservation(id: ID!): DeactivatedReservation!
        getAdminOldReservations(input: rentalQueryInput): [DeactivatedReservation]!
        getUserOldReservations(input: rentalQueryInput): [DeactivatedReservation]!
    }

    type Mutation {
        createReservation(input: createReservationInput): [Reservation]!
        cancelReservation(id: ID!): Reservation!
    }
    `;
