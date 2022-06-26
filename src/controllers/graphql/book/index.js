const { bookService } = require('../../../services/restApi');
const { graphqlBookService } = require('../../../services/graphql');
const { graphqlErrorExecutor } = require('../../../common/error');

const createBook = async (root, args, { ctx }) => {
  try {
    const newBook = await graphqlBookService.createBook(args.input);
    ctx.status = 201;
    return newBook;
  } catch (err) {
    console.log(err);
    return graphqlErrorExecutor(err);
  }
};

const getOneBook = async (root, args, { ctx }) => {
  try {
    const book = await graphqlBookService.getOneBook(args.id);
    console.log(book)
    ctx.status = 200;
    return book;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

const getBookInfoList = async (root, args, { ctx }) => {
  const {
    title, author, page, limit,
  } = args.input;
  try {
    const bookInfoList = await graphqlBookService.getBookInfoList({
      page,
      limit,
      author,
      title,
    });
    ctx.status = 200;
    return bookInfoList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

const deleteBook = async (root, args, { ctx }) => {
  try {
    const deletedBook = await bookService.deleteBook(args.id);
    ctx.status = 204;
    return `The book < ${args.id} > is successfully deleted.`;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

module.exports = {
  createBook, deleteBook, getBookInfoList, getOneBook,
};
