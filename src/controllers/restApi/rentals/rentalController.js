const { rentalService } = require('../../../services/restApi');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 대출 데이터 생성 - 관리자
const createRental = async (ctx) => {
  try {
    if (!ctx.request.body) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    ctx.body = await rentalService.createRental(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (ctx) => {
  const {
    bookId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    if (!bookId && !userId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide information');
    }
    ctx.body = await rentalService.getRentals({
      bookId,
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getRentals({
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 대출 조회
const getOneRental = async (ctx) => {
  try {
    ctx.body = await rentalService.getOneRental(ctx.params.rentalId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 기한 연장 횟수 업데이트
const extendRental = async (ctx) => {
  const rentalId = parseInt(ctx.params.rentalId, 10);
  const { userId } = ctx.state;
  try {
    if (!ctx.params.rentalId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the rental information');
    }
    ctx.body = await rentalService.extendRental(rentalId, userId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 데이터 생성 - 관리자
const createBookReturn = async (ctx) => {
  try {
    if (!ctx.request.body) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    ctx.body = await rentalService.createBookReturn(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (ctx) => {
  const {
    bookId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!bookId && !userId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getBookReturns({
      bookId,
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    ctx.body = await rentalService.getBookReturns({
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 반납 조회
const getOneReturn = async (ctx) => {
  try {
    ctx.body = await rentalService.getOneReturn(ctx.params.rentalId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createRental,
  getAdminRentals,
  getUserRentals,
  getOneRental,
  extendRental,
  createBookReturn,
  getAdminReturns,
  getUserReturns,
  getOneReturn,
};
