const { rentalService } = require('../../services');

// 대출 데이터 생성 - 관리자
const createRentals = async (ctx) => {
  try {
    if (!ctx.request.body) {
      ctx.throw(400, 'please provide the information');
    }
    ctx.body = await rentalService.createRentals(ctx.request.body);
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { bookId, userId } = ctx.request.query;
  try {
    if ((!bookId || !userId) && (!page || !limit)) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getRentals({ bookId, userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getRentals({ userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 단일 대출 조회
const getSingleRental = async (ctx) => {
  try {
    ctx.body = await rentalService.getSingleRental(ctx.params.rentalId);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 대출 기한 연장 횟수 업데이트
const extendRental = async (ctx) => {
  const rentalId = parseInt(ctx.params.rentalId, 10);
  const { userId } = ctx.state;
  try {
    if (!ctx.params.rentalId) {
      ctx.throw(400, 'please provide the rental information');
    }
    ctx.body = await rentalService.extendRental(rentalId, userId);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 반납 데이터 생성 - 관리자
const createBookReturns = async (ctx) => {
  try {
    if (!ctx.request.body) {
      ctx.throw(400, 'please provide the information');
    }
    ctx.body = await rentalService.createBookReturns(ctx.request.body);
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { bookId, userId } = ctx.request.query;
  try {
    if ((!bookId || !userId) && (!page || !limit)) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getBookReturns({ bookId, userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getBookReturns({ userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 단일 반납 조회
const getSingleReturn = async (ctx) => {
  try {
    ctx.body = await rentalService.getSingleReturn(ctx.params.rentalId);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

module.exports = {
  createRentals,
  getAdminRentals,
  getUserRentals,
  getSingleRental,
  extendRental,
  createBookReturns,
  getAdminReturns,
  getUserReturns,
  getSingleReturn,
};
