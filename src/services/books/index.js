const { bookRepository } = require('../../repository');

// 도서 데이터 생성
const createBook = async (bookData) => {
  try {
    const newBook = bookRepository.createBookTransaction(bookData);
    return newBook;
  } catch (err) {
    return err.message;
  }
};

// 도서 목록 조회
const getBooks = async (data) => {
  const {
    page, limit, title, author, category,
  } = data;
  try {
    let offset = 0;
    let newPage = page;
    if (newPage <= 0) {
      newPage = 1;
    } else {
      offset = (newPage - 1) * limit;
    }
    const queryData = {
      offset, limit, title, author, category,
    };
    const BookList = await bookRepository.getBooks(queryData);
    return BookList;
  } catch (err) { return err.message; }
};

// 단일 도서 조회
const getBookById = async (bookId) => {
  try {
    const BookObject = await bookRepository.getById(bookId);
    return BookObject;
  } catch (err) { return err.message; }
};

// 도서 삭제 -> 삭제할 것인지, 상태에 삭제라고 남겨놓을 것인지 고민후 수정 필요
const deleteBook = async (bookId) => {
  try {
    const deletedBook = await bookRepository.destroy(bookId);
    return deletedBook;
  } catch (err) { return err.message; }
};

module.exports = {
  createBook, getBooks, getBookById, deleteBook,
};
