const { rentalService } = require('../../../services/restApi');
const { graphqlRentalService } = require('../../../services/graphql');
const { graphqlErrorExecutor } = require('../../../common/error');

const createRental = async (root, args, { ctx }) => {
  try {
    const newRental = await rentalService.createRental(args.input);
    ctx.status = 201;
    return newRental;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (root, args, { ctx }) => {
  const {
    page, limit, bookId, userId,
  } = args.input;
  try {
    const rentalList = rentalService.getRentals({
      bookId, userId, page, limit,
    });
    ctx.status = 200;
    return rentalList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (root, args, { ctx }) => {
  const { page, limit } = args.input;

  const { userId } = ctx.state;
  try {
    const rentalList = rentalService.getRentals({ userId, page, limit });
    ctx.status = 200;
    return rentalList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 단일 대출 조회
const getOneRental = async (root, args, { ctx }) => {
  try {
    const rental = graphqlRentalService.getOneRental(args.id);
    ctx.status = 200;
    return rental;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 대출 기간 연장
const extendRental = async (root, args, { ctx }) => {
  const { rentalId, userId } = args.input;
  try {
    const updated = await rentalService.extendRental(rentalId, userId);
    ctx.status = 200;
    return 'Successfully extended';
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 반납 데이터 생성 - 관리자
const createBookReturn = async (root, args, { ctx }) => {
  try {
    const bookReturn = await rentalService.createBookReturn(args.input);
    ctx.status = 201;
    return bookReturn;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (root, args, { ctx }) => {
  const {
    bookId, userId, page, limit,
  } = args.input;
  try {
    const bookReturns = await rentalService.getBookReturns({
      bookId, userId, page, limit,
    });
    ctx.status = 200;
    return bookReturns;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (root, args, { ctx }) => {
  const { page, limit } = args.input;
  const { userId } = ctx.state;
  try {
    const bookReturns = await rentalService.getBookReturns({ userId, page, limit });
    ctx.status = 200;
    return bookReturns;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 단일 반납 조회
const getOneReturn = async (root, args, { ctx }) => {
  try {
    const bookReturn = await rentalService.getOneReturn(args.id);
    ctx.status = 200;
    return bookReturn;
  } catch (err) {
    return graphqlErrorExecutor(err);
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
