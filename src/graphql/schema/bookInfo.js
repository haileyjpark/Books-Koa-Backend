const { gql } = require('apollo-server-koa');

module.exports = gql`
    type BookInfo {
        id: ID!
        ISBN: Int!
        title: String!
        author: String!
        publisher: String!
        publicationDate: String!
        thumbnailImage: String
        pages: Int!
        description: String!
        category: Category!
    }

    type Category {
        id: ID!
        categoryName: String!
        parent: Category
    }

    type Query {
        bookInfo(id: ID!): BookInfo!
        bookInfos: [BookInfo!]
    }

    `;
