const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Book {
        id: ID!
        bookType: BookType!
        rentalState: Boolean!
        createdAt: String!
        updatedAt: String!
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
        books: [Book!]    
        }
    
    type Category {
        id: ID!
        categoryName: String!
        parent: Category
        bookInfo: [BookInfo!]
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
        getOneBook(id: ID!): Book!
        getBookInfo(input: bookQueryInput): [BookInfo!]!
    }

    type Mutation {
        createBook(input: createBookInput): Book!
        deleteBook(id: ID!): String!
    }
    `;
