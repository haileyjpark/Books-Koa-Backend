const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Book {
        id: ID!
        bookType: BookType!
        rentalState: Boolean!
        BookInfo: BookInfo!
        createdAt: String!
        updatedAt: String!
    }
    enum BookType {
        EBOOK
        PAPER_BOOK
        AUDIO_BOOK
    }
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
        Category: Category!
    }
    
    type Category {
        id: ID!
        categoryName: String!
        parent: Category
    }
    input createBookInput {
        bookType: BookType!
        ISBN: Int!
        title: String!
        author: String!
        publisher: String!
        publicationDate: String!
        thumbnailImage: String
        pages: Int!
        description: String!
        categoryId: Int!   
    }
    input bookQueryInput {
        page: Int
        limit: Int
        title: String
        author: String
        category: String
    }
    type Query {
        book(id: ID!): Book!
        books(input: bookQueryInput): [Book!]! @auth(requires: ADMIN)
    }
    type Mutation {
        createBook(input: createBookInput): Book!
        deleteBook(id: ID!): String!
    }
    `;