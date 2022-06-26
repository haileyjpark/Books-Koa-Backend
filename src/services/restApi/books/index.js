const { bookRepository } = require('../../../repository');
const { pagination } = require('../../../common/util/pagination');

// 도서 데이터 생성
const createBook = async (data) => {
  const newBook = await bookRepository.createBookTransaction(data);
  const newBookWithBookInfo = await bookRepository.getOneWithBookInfo(newBook.id);
  return newBookWithBookInfo;
};

// 도서 목록 조회
const getBooks = async (data) => {
  const {
    page, limit, title, author, category,
  } = data;
  const bookList = await bookRepository.getBooksWithBookInfo({
    ...pagination(page, limit), title, author, category,
  });
  return bookList;
};

// 단일 도서 조회
const getOneBook = async (bookId) => {
  const book = await bookRepository.getOne({ bookId });
  return book;
};

// 도서 삭제 -> 삭제할 것인지, 상태에 삭제라고 남겨놓을 것인지 고민후 수정 필요
const deleteBook = async (bookId) => {
  const deletedBook = await bookRepository.destroy(bookId);
  return deletedBook;
};

module.exports = {
  createBook, getBooks, getOneBook, deleteBook,
};
