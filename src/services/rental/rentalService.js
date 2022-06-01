const {
  rentalRepository, returnRepository, reservationRepository, bookRepository, userRepository,
} = require('../../repository');
const { pagination } = require('../../common/util/pagination');

// 연체 체크 로직 - (연체된 고객은 [반납 / 대출 연장 / 예약]을 할 수 없음)
const checkOverdue = async (userId) => {
  const userRental = await rentalRepository.getRentals({ userId });
  const today = new Date();
  const user = await userRepository.getOne({ userId });
  const isOverdue = await userRental.some((singleRental) => singleRental.returnDueDate < today);
  // 유저 데이터의 대출 가능 날짜가 오늘 이후이거나, 유저가 현재 대출중인 대출 데이터에 연체된 책이 있다면 대출 불가
  if ((user.availableRentalDate > today) || (isOverdue)) {
    return { status: false };
  }
  return { status: true };
};

// 대출 데이터 생성 - 관리자
const createRentals = async (rentalData) => {
  const { userId } = rentalData[0];
  const userRental = await rentalRepository.getRentals({ userId });
  if (userRental.length >= 5) {
    throw new Error('이 고객은 현재 대출 가능 권수를 초과하여 대출이 불가능합니다.');
  }
  // 연체 체크 (모듈화 하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    throw new Error('이 고객은 연체로 인해 현재 대출이 불가능합니다.');
  }
  // ***** 동시에 대출 신청이 들어올 경우 어떻게 처리해야 할까? -> 고민 필요 *****
  const bookRentals = await Promise.all(rentalData.map(
    async (singleRental) => {
      const { bookId, rentalCode } = singleRental;
      const rentalByBookId = await rentalRepository.getOneWithBook({ bookId });
      const book = await bookRepository.getById(bookId);
      if (rentalByBookId) {
        throw new Error(`< ${book.BookInfo.title} > 은 현재 대출중입니다.`);
      }
      const rentalByRentalCode = await rentalRepository.getOneWithBook({ rentalCode });
      // 대출 코드 validation을 어느 레이어에서 핸들링 해줘야할지 고민
      // (db에서는 unique:true 옵션이 있으므로 중복 저장이 되기 전에 Validation Error발생)
      // findOrCreate를 해줘야 할 지? -> 클라이언트에서 중복값을 주지는 않겠지만...
      if (rentalByRentalCode) {
        throw new Error('이미 존재하는 대출 코드입니다.');
      }
      const today = new Date();
      const returnDueDate = new Date(today);
      returnDueDate.setDate(today.getDate() + 11);
      returnDueDate.setHours(0, 0, 0, 0);
      singleRental.returnDueDate = returnDueDate;

      const createdSingleRental = rentalRepository.createRentalTransaction(singleRental);
      return createdSingleRental;
    },
  ));
  return bookRentals;
};

// 대출중 목록 조회
const getRentals = async (data, page, limit) => {
  const RentalList = await rentalRepository.getRentals(data, pagination(page, limit));
  return RentalList;
};

// 대출 상세 정보 조회
const getOneRental = async (rentalId) => {
  const rental = await rentalRepository.getOneWithBook(rentalId);
  return rental;
};

// 대출 기한 연장 - 유저
const extendRental = async (rentalId, userId) => {
  const rentalData = await rentalRepository.getOneWithBook({ rentalId });
  if (!rentalData) {
    throw new Error('존재하지 않는 대출 건입니다.');
  }
  if (rentalData && (rentalData.extension >= 3)) {
    throw new Error('연장 가능한 횟수를 초과하였습니다.');
  }
  const { bookInfoId } = rentalData.Book;
  const rentalState = { value: false };
  const availableBooks = await bookRepository.getBooks({ bookInfoId, rentalState });
  const reservationsForBooks = await reservationRepository.getReservations({ bookInfoId });

  if ((availableBooks.length - reservationsForBooks.length) < 0) {
    // 해당 bookInfo를 가지고 있는 책 목록 중 rentalState(대출중 상태) false인 갯수 - 해당 bookInfo가지고 있는 예약 목록 갯수 < 0 면 못빌림
    throw new Error('예약중인 책은 연장이 불가능합니다.');
  }

  // 연체 체크 (모듈화하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    throw new Error('이 고객은 연체로 인해 현재 대출 기한 연장이 불가능합니다.');
  }

  const { returnDueDate } = rentalData;
  await returnDueDate.setDate(returnDueDate.getDate() + 11);
  await returnDueDate.setHours(0, 0, 0, 0);

  const updated = await rentalRepository.extendRental({ rentalId, returnDueDate });
  return updated;
};

// 반납 데이터 생성 - 관리자
const createBookReturns = async (bookReturnData) => {
  const bookReturns = await Promise.all(bookReturnData.map(async (singleBookReturn) => {
    const { bookId, userId } = singleBookReturn;
    const rentalData = await rentalRepository.getOneWithBook({ bookId, userId });
    if (!rentalData) {
      throw new Error('도서가 대출중 도서 목록에 없습니다.');
    }
    const newBookReturn = await returnRepository.createReturnTransaction(rentalData);
    return newBookReturn;
  }));
  return bookReturns;
};

// 반납 내역 조회
const getBookReturns = async (data, page, limit) => {
  const BookReturnList = await returnRepository.getBookReturns(data, pagination(page, limit));
  return BookReturnList;
};

// 반납 상세 정보 조회
const getOneReturn = async (rentalId) => {
  const rental = await returnRepository.getOne(rentalId);
  return rental;
};

module.exports = {
  createRentals,
  getRentals,
  extendRental,
  createBookReturns,
  getBookReturns,
  getOneRental,
  getOneReturn,
  checkOverdue,
};
