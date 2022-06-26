const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Reservation {
        id: Int!
        reservationCode: String!
        bookInfo: BookInfo!
        user: User!
        reservedDate: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type DeactivatedReservation {
        id: Int!
        reservationCode: String!
        bookInfo: BookInfo!
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
        getOneReservation(id: Int!): Reservation!
        getAdminReservations(input: rentalQueryInput): [Reservation]!
        getUserReservations(input: rentalQueryInput): [Reservation]!
        getOneOldReservation(id: Int!): DeactivatedReservation!
        getAdminOldReservations(input: rentalQueryInput): [DeactivatedReservation]!
        getUserOldReservations(input: rentalQueryInput): [DeactivatedReservation]!
    }

    type Mutation {
        createReservation(input: createReservationInput): Reservation!
        cancelReservation(id: Int!): DeactivatedReservation!
    }
    `;
