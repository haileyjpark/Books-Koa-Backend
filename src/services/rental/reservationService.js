/* eslint-disable max-len */
const {
  rentalRepository, reservationRepository, deactivatedReservationRepository,
} = require('../../repository');
const { checkOverdue } = require('./rentalService');

// 예약 데이터 생성
const createReservation = async (reservationData, bookInfoId, userId) => {
  const rentals = await rentalRepository.getByBookInfoId(bookInfoId);
  if (!rentals) {
    return '도서가 대출중 도서 목록에 없습니다.';
  }
  const userReservation = await reservationRepository.getReservations({ userId });
  if (userReservation.length >= 5) {
    return '이 고객은 현재 예약 가능 권수를 초과하여 예약이 불가능합니다.';
  }
  // 연체 체크 (모듈화하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    return '이 고객은 연체로 인해 현재 예약이 불가능합니다.';
  }
  const reservation = await reservationRepository.getOne({ userId, bookInfoId });
  if (reservation) {
    return '이미 예약한 책입니다.';
  }
  try {
    const newReservation = await reservationRepository.create(reservationData, bookInfoId, userId);
    return newReservation;
  } catch (err) {
    return err.message;
  }
};

// 예약 목록 조회
const getReservations = async (data, page, limit) => {
  try {
    let offset = 0;
    let newPage = page;
    if (newPage <= 0) {
      newPage = 1;
    } else {
      offset = (newPage - 1) * limit;
    }
    const reservationList = await reservationRepository.getReservations(data, offset, limit);
    if (!reservationList) {
      return '잘못된 예약 정보를 입력하셨습니다.';
    }
    return reservationList;
  } catch (err) { return err.message; }
};

// 예약 상세 정보 조회
const getSingleReservation = async (data) => {
  try {
    const { reservationId, userId } = data;
    const reservation = await reservationRepository.getOne({ reservationId });
    if (!reservation) {
      return '잘못된 예약 정보를 입력하셨습니다.';
    }
    const reservationListForBook = await reservationRepository.getReservations({
      bookInfoId: reservation.bookInfoId,
    });
    // reservationCount는 해당 유저가 예약한 책에 대해 몇번째 예약자인지를 나타내는 값입니다.
    const reservationCount = (reservationListForBook.findIndex((idx) => idx.userId === userId)) + 1;
    reservation.dataValues.reservationCount = reservationCount;
    return reservation;
  } catch (err) { return err.message; }
};

// 예약 취소
const cancelReservation = async (userId, bookInfoId) => {
  const reservationData = await reservationRepository.getOne({ userId, bookInfoId });
  if (!reservationData) {
    return '예약 정보가 없습니다.';
  }
  const cancelledReservation = await reservationRepository.cancelTransaction(reservationData);
  return cancelledReservation;
};

// 과거 예약 목록 조회
const getOldReservations = async (data, page, limit) => {
  try {
    let offset = 0;
    let newPage = page;
    if (newPage <= 0) {
      newPage = 1;
    } else {
      offset = (newPage - 1) * limit;
    }
    const oldReservationList = await deactivatedReservationRepository.getOldReservations(data, offset, limit);
    if (!oldReservationList) {
      return '잘못된 예약 정보를 입력하셨습니다.';
    }
    return oldReservationList;
  } catch (err) { return err.message; }
};

// 과거 예약 상세 정보 조회
const getSingleOldReservation = async (reservationId) => {
  try {
    const oldReservation = await deactivatedReservationRepository.getOne({ reservationId });
    if (!oldReservation) {
      return '잘못된 예약 정보를 입력하셨습니다.';
    }
    return oldReservation;
  } catch (err) { return err.message; }
};

module.exports = {
  createReservation,
  cancelReservation,
  getReservations,
  getOldReservations,
  getSingleReservation,
  getSingleOldReservation,
};
