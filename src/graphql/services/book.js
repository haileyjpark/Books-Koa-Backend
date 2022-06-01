const { bookRepository } = require('../../repository');
const { pagination } = require('../../common/util/pagination');

const createBook = async (bookData) => {
  try {
    const newBook = await bookRepository.createBookTransaction(bookData);
    return newBook;
  } catch (err) {
    return err.message;
  }
};

// title, category, author 검색 추가 필요...
const getBooks = async (data) => {
  try {
    const BookList = await bookRepository.getBooks(pagination(data.page, data.limit));
    return BookList;
  } catch (err) { return err.message; }
};

const getOneBook = async (bookId) => {
  try {
    const book = await bookRepository.getOne({ bookId });
    return book;
  } catch (err) { return err.message; }
};

const getBookInfo = async (data) => {
  const {
    page, limit, title, author, category,
  } = data;
  try {
    const BookList = await bookRepository.getBookInfo(pagination(page, limit), { title, author, category });
    return BookList;
  } catch (err) { return err.message; }
};

module.exports = {
  createBook, getBooks, getBookInfo, getOneBook,
};
