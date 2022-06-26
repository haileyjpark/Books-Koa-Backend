const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { graphqlBookController } = require('../../../controllers/graphql');
const { graphqlAdminAuthorized } = require('../../../common/auth');

const resolvers = {
  Query: {
    getOneBook: graphqlBookController.getOneBook,
    getBookInfoList: graphqlBookController.getBookInfoList,
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
      const category = await context.loaders.categoryLoader.load(parent.categoryId);
      return category;
    },
  },
  Book: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
  },
};

const resolversComposition = {
  'Mutation.createBook': [graphqlAdminAuthorized()],
  'Mutation.deleteBook': [graphqlAdminAuthorized()],
};

const bookResolver = composeResolvers(resolvers, resolversComposition);

module.exports = { bookResolver };
