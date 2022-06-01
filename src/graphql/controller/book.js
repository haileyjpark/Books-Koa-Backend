const { bookService } = require('../../services');
const { graphqlBookService } = require('../services');

const createBook = async (root, args, context) => {
  try {
    if (!args.input) {
      context.ctx.throw(400, 'please provide the information');
    }
    const newBook = await graphqlBookService.createBook(args.input);
    context.ctx.status = 201;
    return newBook;
  } catch (err) { return context.ctx.throw(500, err); }
};

const getBooks = async (root, args, context) => {
  const page = Number(args.input.page);
  const limit = Number(args.input.limit);
  const { title, author, category } = args.input;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    const bookList = await graphqlBookService.getBooks({
      page, limit, author, category, title,
    });
    context.ctx.status = 200;
    return bookList;
  } catch (err) { return context.ctx.throw(500, err); }
};

const getBookById = async (root, args, context) => {
  try {
    const id = Number(args.id);
    const book = await graphqlBookService.getBookById(id);
    context.ctx.status = 200;
    return book;
  } catch (err) { return context.ctx.throw(500, err); }
};

const getBookInfo = async (root, args, context) => {
  const page = Number(args.input.page);
  const limit = Number(args.input.limit);
  const { title, author, category } = args.input;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    const bookInfoList = await graphqlBookService.getBookInfo({
      page, limit, author, category, title,
    });
    context.ctx.status = 200;
    return bookInfoList;
  } catch (err) { return context.ctx.throw(500, err); }
};

const deleteBook = async (root, args, context) => {
  try {
    const id = Number(args.id);
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      context.ctx.status = 204;
      return { message: ` Failed to deleted the book <${id}>.` };
    }
    context.ctx.status = 200;
    return { message: `The book < ${id} > is successfully deleted.` };
  } catch (err) { return context.ctx.throw(500, err); }
};

module.exports = {
  createBook, getBooks, deleteBook, getBookInfo, getBookById,
};
