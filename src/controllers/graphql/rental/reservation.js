const { reservationService } = require('../../../services/restApi');
const { graphqlErrorExecutor } = require('../../../common/error');

// 예약 데이터 생성 - 유저
const createReservation = async (root, args, { ctx }) => {
  try {
    const { reservationCode, bookInfoId } = args.input;
    const newReservation = await reservationService.createReservation({
      reservationCode,
      bookInfoId,
      userId: ctx.state.userId,
    });
    ctx.status = 201;
    return newReservation;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 예약 목록 조회 - 관리자페이지
const getAdminReservations = async (root, args, { ctx }) => {
  const {
    page, limit, bookInfoId, userId,
  } = args.input;
  try {
    const reservationList = await reservationService.getReservations({
      bookInfoId, userId, page, limit,
    });
    ctx.status = 200;
    return reservationList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 예약 목록 조회 - 유저 마이페이지
const getUserReservations = async (root, args, { ctx }) => {
  try {
    const reservationList = await reservationService.getReservations({ userId: ctx.state.userId });
    ctx.status = 200;
    return reservationList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 단일 예약 조회 - 관리자 / 유저 마이페이지
const getOneReservation = async (root, args, { ctx }) => {
  try {
    const reservation = await reservationService.getOneReservation(args.id);
    ctx.status = 200;
    return reservation;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 예약 취소 - 유저
const cancelReservation = async (root, args, { ctx }) => {
  try {
    const cancelledReservation = await reservationService.cancelReservation(args.id);
    ctx.status = 200;
    return cancelledReservation;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 과거 예약 (종료된 예약) 목록 조회 - 관리자페이지
const getAdminOldReservations = async (root, args, { ctx }) => {
  const {
    page, limit, bookInfoId, userId,
  } = args.input;
  try {
    const oldReservationList = await reservationService.getOldReservations({
      bookInfoId, userId, page, limit,
    });
    ctx.status = 200;
    return oldReservationList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 과거 예약 (종료된 예약) 목록 조회 - 유저 마이페이지
const getUserOldReservations = async (root, args, { ctx }) => {
  try {
    const reservationList = await reservationService.getOldReservations({ userId: ctx.state.userId });
    ctx.status = 200;
    return reservationList;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

// 단일 과거 예약 조회 - 유저 마이페이지
const getOneOldReservation = async (root, args, { ctx }) => {
  try {
    const oldReservation = await reservationService.getOneOldReservation(args.id);
    ctx.status = 200;
    return oldReservation;
  } catch (err) {
    return graphqlErrorExecutor(err);
  }
};

module.exports = {
  createReservation,
  cancelReservation,
  getAdminReservations,
  getUserReservations,
  getOneReservation,
  getAdminOldReservations,
  getUserOldReservations,
  getOneOldReservation,
};
