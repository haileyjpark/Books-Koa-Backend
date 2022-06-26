const { bookService } = require('../../../services/restApi');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 도서 등록 - 관리자
const createBook = async (ctx) => {
  try {
    if (!ctx.request.body) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    ctx.body = await bookService.createBook(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 도서 목록 조회 - 관리자 / 유저
const getBooks = async (ctx) => {
  const {
    title, author, category, page, limit,
  } = ctx.request.query;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    ctx.body = await bookService.getBooks({
      page, limit, author, category, title,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 도서 상세 페이지 조회 - 관리자 / 유저
const getOneBook = async (ctx) => {
  try {
    ctx.body = await bookService.getOneBook(ctx.params.id);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 도서 삭제 - 관리자
const deleteBook = async (ctx) => {
  try {
    const bookId = ctx.params.id;
    const deletedBook = await bookService.deleteBook(bookId);
    if (deletedBook) {
      ctx.body = { message: `The book < ${bookId} > is successfully deleted.` };
      ctx.status = 204;
    } else {
      ctx.status = 500;
      throw new CustomError(ERROR_CODE.SERVER_ERROR, ` Failed to deleted the book <${bookId}>.`);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createBook, getBooks, getOneBook, deleteBook,
};

/*
다음 PR에 반영할 사항들
1. 도서 대량 등록
2. 도서 정보 수정
*/
