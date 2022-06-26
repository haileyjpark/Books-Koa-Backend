const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Book {
        id: Int!
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
        id: Int!
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
        id: Int!
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
    }

    type Query {
        getOneBook(id: Int!): Book!
        getBookInfoList(input: bookQueryInput): [BookInfo!]!
    }

    type Mutation {
        createBook(input: createBookInput): Book!
        deleteBook(id: Int!): String!
    }
    `;
