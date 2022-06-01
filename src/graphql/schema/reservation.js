const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Reservation {
        id: ID!
        reservationCode: String!
        Book: Book!
        User: User!
        reservationDate: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type DeactivatedReservation {
        id: ID!
        reservationCode: String!
        Book: Book!
        User: User!
        reservationStartDate: String!
        reservationEndDate: String!
        state: state!
    }
    enum state {
        RENTED
        CANCELLED
    }
    `;
