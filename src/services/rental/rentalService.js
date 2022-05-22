const {
  rentalRepository, returnRepository, reservationRepository, bookRepository, userRepository,
} = require('../../repository');

// 연체 체크 로직 - (연체된 고객은 [반납 / 대출 연장 / 예약]을 할 수 없음)
const checkOverdue = async (userId) => {
  try {
    const userRental = await rentalRepository.getRentals({ userId });
    const today = new Date();
    const user = await userRepository.getOne({ userId });
    const isOverdue = await userRental.some((singleRental) => singleRental.returnDueDate < today);
    // 유저 데이터의 대출 가능 날짜가 오늘 이후이거나, 유저가 현재 대출중인 대출 데이터에 연체된 책이 있다면 대출 불가
    if ((user.availableRentalDate > today) || (isOverdue)) {
      return { status: false };
    }
    return { status: true };
  } catch (err) {
    return err.message;
  }
};

// 대출 데이터 생성 - 관리자
const createRentals = async (rentalData) => {
  const { userId } = rentalData[0];
  const userRental = await rentalRepository.getRentals({ userId });
  if (userRental.length >= 5) {
    return '이 고객은 현재 대출 가능 권수를 초과하여 대출이 불가능합니다.';
  }
  // 연체 체크 (모듈화 하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    return '이 고객은 연체로 인해 현재 대출이 불가능합니다.';
  }
  // ***** 동시에 대출 신청이 들어올 경우 어떻게 처리해야 할까? -> 고민 필요 *****
  const bookRentals = await Promise.all(rentalData.map(
    async (singleRental) => {
      const { bookId } = singleRental;
      const rental = await rentalRepository.getOne({ bookId });
      const book = await bookRepository.getById(bookId);
      if (rental) {
        return `< ${book.BookInfo.title} > 은 현재 대출중입니다.`;
      }
      const createdSingleRental = rentalRepository.createRentalTransaction(singleRental);
      return createdSingleRental;
    },
  ));
  return bookRentals;
};

// 대출중 목록 조회
const getRentals = async (data, page, limit) => {
  try {
    let offset = 0;
    let newPage = page;
    if (newPage <= 0) {
      newPage = 1;
    } else {
      offset = (newPage - 1) * limit;
    }
    const RentalList = await rentalRepository.getRentals(data, offset, limit);
    return RentalList;
  } catch (err) {
    return err.message;
  }
};

// 대출 상세 정보 조회
const getSingleRental = async (rentalId) => {
  try {
    const rental = await rentalRepository.getOne(rentalId);
    return rental;
  } catch (err) {
    return err.message;
  }
};

// 대출 기한 연장 - 유저
const extendRental = async (rentalId, userId) => {
  const rentalData = await rentalRepository.getOne({ rentalId });
  if (!rentalData) {
    return '존재하지 않는 대출 건입니다.';
  }
  if (rentalData && (rentalData.extension >= 3)) {
    return '연장 가능한 횟수를 초과하였습니다.';
  }
  const { bookInfoId } = rentalData.Book;
  const rentalState = { value: false };
  const availableBooks = await bookRepository.getBooks({ bookInfoId, rentalState });
  const reservationsForBooks = await reservationRepository.getReservations({ bookInfoId });

  if ((availableBooks.length - reservationsForBooks.length) < 0) {
    // 해당 bookInfo를 가지고 있는 책 목록 중 rentalState(대출중 상태) false인 갯수 - 해당 bookInfo가지고 있는 예약 목록 갯수 < 0 면 못빌림
    return '예약중인 책은 연장이 불가능합니다.';
  }
  // 연체 체크 (모듈화하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    return '이 고객은 연체로 인해 현재 대출 기한 연장이 불가능합니다.';
  }
  try {
    const updated = await rentalRepository.extend(rentalId);
    return updated;
  } catch (err) {
    return err.message;
  }
};

// 반납 데이터 생성 - 관리자
const createBookReturns = async (bookReturnData) => {
  const bookReturns = await Promise.all(bookReturnData.map(async (singleBookReturn) => {
    const { bookId, userId } = singleBookReturn;
    const rentalData = await rentalRepository.getOne({ bookId, userId });
    if (!rentalData) {
      return '도서가 대출중 도서 목록에 없습니다.';
    }
    const newBookReturn = await returnRepository.createReturnTransaction(rentalData);
    return newBookReturn;
  }));
  return bookReturns;
};

// 반납 내역 조회
const getBookReturns = async (data, page, limit) => {
  try {
    let offset = 0;
    let newPage = page;
    if (newPage <= 0) {
      newPage = 1;
    } else {
      offset = (newPage - 1) * limit;
    }
    const BookReturnList = await returnRepository.getBookReturns(data, offset, limit);
    return BookReturnList;
  } catch (err) {
    return err.message;
  }
};

// 반납 상세 정보 조회
const getSingleReturn = async (rentalId) => {
  try {
    const rental = await returnRepository.getOne(rentalId);
    return rental;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  createRentals,
  getRentals,
  extendRental,
  createBookReturns,
  getBookReturns,
  getSingleRental,
  getSingleReturn,
  checkOverdue,
};
