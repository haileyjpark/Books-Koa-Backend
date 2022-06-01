const { rentalService } = require('../../services');
const { graphqlRentalService } = require('../services');

const createRentals = async (root, args, context) => {
  try {
    if (!args.input) {
      context.ctx.throw(400, 'please provide the information');
    }
    const newRental = await rentalService.createRentals(args.input);
    context.ctx.status = 201;
    return newRental;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (root, args, context) => {
  const {
    page, limit, bookId, userId,
  } = args.input;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    if (!bookId && !userId) {
      context.ctx.throw(400, 'you should provide information');
    }
    const rentalList = rentalService.getRentals({ bookId, userId }, page, limit);
    context.ctx.status = 200;
    return rentalList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (root, args, context) => {
  const { page, limit } = args.input;
  const { userId } = context.ctx.state;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    if (!userId) {
      context.ctx.throw(401, 'no login information');
    }
    const rentalList = rentalService.getRentals({ userId }, page, limit);
    context.ctx.status = 200;
    return rentalList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 단일 대출 조회
const getOneRental = async (root, args, context) => {
  const { rentalId } = args.input;
  try {
    if (!rentalId) {
      context.ctx.throw(401, 'you should provide rentalId');
    }
    const rental = graphqlRentalService.getOneRental(rentalId);
    context.ctx.status = 200;
    return rental;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 대출 기간 연장
const extendRental = async (root, args, context) => {
  const { rentalId, userId } = args.input;
  try {
    if (!rentalId) {
      context.ctx.throw(400, 'please provide the rental information');
    }
    const updated = await rentalService.extendRental(rentalId, userId);
    context.ctx.status = 200;
    if (!updated) {
      throw new Error('update failed');
    }
    return 'Successfully extended';
  } catch (err) { return context.ctx.throw(500, err); }
};

// 반납 데이터 생성 - 관리자
const createBookReturns = async (root, args, context) => {
  try {
    if (!args.input) {
      context.ctx.throw(400, 'please provide the rental information');
    }
    const bookReturn = await rentalService.createBookReturns(args.input);
    context.ctx.status = 201;
    return bookReturn;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (root, args, context) => {
  const {
    bookId, userId, page, limit,
  } = args.input;
  try {
    if (!bookId && !userId) {
      context.ctx.throw(400, 'please provide the information');
    }
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    const bookReturns = await rentalService.getBookReturns({ bookId, userId }, page, limit);
    context.ctx.status = 200;
    return bookReturns;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (root, args, context) => {
  const { page, limit } = args.input;
  const { userId } = context.ctx.state;
  try {
    if (!userId) {
      context.ctx.throw(401, 'no login information');
    }
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    const bookReturns = await rentalService.getBookReturns({ userId }, page, limit);
    context.ctx.status = 200;
    return bookReturns;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 단일 반납 조회
const getOneReturn = async (root, args, context) => {
  const { rentalId } = args.input;
  try {
    if (!rentalId) {
      context.ctx.throw(400, 'please provide the information');
    }
    const bookReturn = await rentalService.getSingleReturn(rentalId);
    context.ctx.status = 200;
    return bookReturn;
  } catch (err) { return context.ctx.throw(500, err); }
};

module.exports = {
  createRentals,
  getAdminRentals,
  getUserRentals,
  getOneRental,
  extendRental,
  createBookReturns,
  getAdminReturns,
  getUserReturns,
  getOneReturn,
};
