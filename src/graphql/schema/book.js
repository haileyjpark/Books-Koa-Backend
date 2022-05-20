const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Book {
        id: ID!
        bookType: BookType!
        rentalStatus: Boolean!
        bookInfo: BookInfo!
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
        category: Category!
    }
    
    type Category {
        id: ID!
        categoryName: String!
        parent: Category
    }

    type Query {
        book(id: ID!): Book!
        books: [Book!]
    }

    type Mutation {
        createBook(bookType: BookType!, bookInfo: Int!): Book!
      }
    `;
