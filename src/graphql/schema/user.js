const { gql } = require('apollo-server-koa');

module.exports = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        password: String!
        phoneNumber: String!
        overdueCount: Int!
        availableRentalDate: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type AdminUser {
        id: ID!
        userName: String!
        email: String!
        password: String!
        phoneNumber: String!
        createdAt: String!
        updatedAt: String!
    }

    enum userType {
        ADMIN
        USER
    }
    
    input createUserInput {
        userName: String!
        email: String!
        password: String!
        phoneNumber: String!
        userType: userType!
    }

    input signInInput {
        email: String!
        password: String!
        userType: userType! 
    }

    type Token {
        Authorization: String!
    }

    type Mutation {
        signUp(input: createUserInput): String!
        signIn(input: signInInput): Token!
    }
    `;
