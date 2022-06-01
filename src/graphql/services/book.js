const { bookRepository } = require('../../repository');

const createBook = async (bookData) => {
  try {
    const newBook = await bookRepository.createBookTransaction(bookData);
    console.log(newBook);
    return newBook;
  } catch (err) {
    return err.message;
  }
};

const pagination = (page, limit) => {
  let offset = 0;
  let newPage = page;
  if (newPage <= 0) {
    newPage = 1;
  } else {
    offset = (newPage - 1) * limit;
  }
  return { offset, limit };
};

// title, category, author 검색 어떻게 하지...
const getBooks = async (data) => {
  try {
    const paginationData = pagination(data.page, data.limit);
    const BookList = await bookRepository.getBooks({
      offset: paginationData.offset, limit: paginationData.limit,
    });
    return BookList;
  } catch (err) { return err.message; }
};

const getBookById = async (bookId) => {
  try {
    const book = await bookRepository.getBookById(bookId);
    return book;
  } catch (err) { return err.message; }
};

const getBookInfo = async (data) => {
  const {
    page, limit, title, author, category,
  } = data;
  try {
    const paginationData = pagination(page, limit);
    const BookList = await bookRepository.getBookInfo({
      offset: paginationData.offset, limit: paginationData.limit, title, author, category,
    });
    return BookList;
  } catch (err) { return err.message; }
};

module.exports = {
  createBook, getBooks, getBookInfo, getBookById,
};
