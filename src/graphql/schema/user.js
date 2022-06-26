const { gql } = require('apollo-server-koa');

module.exports = gql`
    type User {
        id: String!
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
        id: String!
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
    
    type Authorization {
        accessToken: String!
        refreshToken: String!
    }
    type token {
        Authorization: Authorization!
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
    }

    input refreshTokenInput {
        accessToken: String!
        refreshToken: String!
    }

    type Mutation {
        signUp(input: createUserInput): String!
        adminSignIn(input: signInInput): token!
        userSignIn(input: signInInput): token!
        refreshAccessToken(input: refreshTokenInput): token!
    }
    `;
