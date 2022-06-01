const { graphqlBookController } = require('../controller');

const bookResolver = {
  Query: {
    getOneBook: graphqlBookController.getOneBook,
    getBookInfo: graphqlBookController.getBookInfo,
  },
  Mutation: {
    createBook: graphqlBookController.createBook,
    deleteBook: graphqlBookController.deleteBook,
  },

  BookInfo: {
    books: async (parent, _, context) => {
      const bookList = await context.loaders.bookLoader.load(parent.id);
      return bookList;
    },
    category: async (parent, _, context) => {
      const categoryList = await context.loaders.categoryLoader.load(parent.categoryId);
      return categoryList;
    },
  },
  Book: {
    bookInfo: async (parent, _, context) => {
      const bookInfoList = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfoList;
    },
  },
};

module.exports = { bookResolver };
