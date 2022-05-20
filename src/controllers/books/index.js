const { bookService } = require('../../services');

// 도서 등록 - 관리자
const createBook = async (ctx) => {
  try {
    if (!ctx.request.body) {
      ctx.throw(400, 'please provide the information');
    }
    ctx.body = await bookService.createBook(ctx.request.body);
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 도서 목록 조회 - 관리자 / 유저
const getBooks = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { title, author, category } = ctx.request.query;
  const bookInfoData = {
    page, limit, author, category, title,
  };
  try {
    if (!page || !limit) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await bookService.getBooks(bookInfoData);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 도서 상세 페이지 조회 - 관리자 / 유저
const getBookById = async (ctx) => {
  try {
    ctx.body = await bookService.getBookById(ctx.params.id);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 도서 삭제 - 관리자
const deleteBook = async (ctx) => {
  try {
    ctx.body = await bookService.deleteBook(ctx.params.id);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

module.exports = {
  createBook, getBooks, getBookById, deleteBook,
};

/*
다음 PR에 반영할 사항들
1. 도서 대량 등록
2. 도서 정보 수정
*/
