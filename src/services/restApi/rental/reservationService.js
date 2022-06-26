/* eslint-disable max-len */
const {
  rentalRepository, reservationRepository, deactivatedReservationRepository,
} = require('../../../repository');
const { checkOverdue } = require('./rentalService');
const { pagination } = require('../../../common/util/pagination');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 예약 데이터 생성
const createReservation = async (reservationCode, bookInfoId, userId) => {
  const rentals = await rentalRepository.getRentalsByBookInfo(bookInfoId);
  if (rentals.length === 0) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, '도서가 대출중 도서 목록에 없습니다.', '[restAPI/services/reservation/NOT_EXIST_RENTAL]');
  }
  const userReservation = await reservationRepository.getReservations({ userId });
  if (userReservation.length >= 5) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '이 고객은 현재 예약 가능 권수를 초과하여 예약이 불가능합니다.', '[restAPI/services/reservation/INVALID_INPUT]');
  }
  // 연체 체크 (모듈화하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '이 고객은 연체로 인해 현재 예약이 불가능합니다.', '[restAPI/services/reservation/INVALID_INPUT]');
  }
  const reservation = await reservationRepository.getOne({ userId, bookInfoId });
  if (reservation) {
    throw new CustomError(ERROR_CODE.VALIDATION_ERROR, '이미 예약한 책입니다.', '[restAPI/services/reservation/VALIDATION_ERROR]');
  }
  const newReservation = await reservationRepository.create({ reservationCode, bookInfoId, userId });
  return newReservation;
};

// 예약 목록 조회
const getReservations = async (data) => {
  const reservationList = await reservationRepository.getReservations({
    ...data, ...pagination(data.page, data.limit),
  });
  return reservationList;
};

// 예약 상세 정보 조회
const getOneReservation = async (reservationId) => {
  const reservation = await reservationRepository.getOne({ reservationId });
  const { userId } = reservation;
  const reservationListForBook = await reservationRepository.getReservations({
    bookInfoId: reservation.bookInfoId,
  });
    // reservationCount는 해당 유저가 예약한 책에 대해 몇번째 예약자인지를 나타내는 값입니다.
  const reservationCount = (reservationListForBook.findIndex((idx) => idx.userId === userId)) + 1;
  reservation.dataValues.reservationCount = reservationCount;
  return reservation;
};

// 예약 취소
const cancelReservation = async (reservationId) => {
  const reservationData = await reservationRepository.getOne({ reservationId });
  if (!reservationData) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RESERVATION, '예약 정보가 없습니다.', '[restAPI/services/reservation/NOT_EXIST_RESERVATION]');
  }
  const cancelledReservation = await reservationRepository.cancelTransaction(reservationData);
  return cancelledReservation;
};

// 과거 예약 목록 조회
const getOldReservations = async (data) => {
  const oldReservationList = await deactivatedReservationRepository.getOldReservations({
    ...data, ...pagination(data.page, data.limit),
  });
  return oldReservationList;
};

// 과거 예약 상세 정보 조회
const getOneOldReservation = async (reservationId) => {
  const oldReservation = await deactivatedReservationRepository.getOne({ reservationId });
  return oldReservation;
};

module.exports = {
  createReservation,
  cancelReservation,
  getReservations,
  getOldReservations,
  getOneReservation,
  getOneOldReservation,
};
