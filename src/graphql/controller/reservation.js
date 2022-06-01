const { reservationService } = require('../../services');

// 예약 데이터 생성 - 유저
const createReservation = async (root, args, context) => {
  try {
    const { reservationCode, bookInfoId } = args.input;
    if (!reservationCode || !bookInfoId) {
      context.ctx.throw(400, 'please provide the information');
    }
    const newReservation = await reservationService.createReservation(reservationCode, bookInfoId, context.ctx.state.userId);
    context.ctx.status = 201;
    return newReservation;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 예약 목록 조회 - 관리자페이지
const getAdminReservations = async (root, args, context) => {
  const {
    page, limit, bookInfoId, userId,
  } = args.input;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    if (!bookInfoId && !userId) {
      context.ctx.throw(400, 'you should provide information');
    }
    const reservationList = await reservationService.getReservations({ bookInfoId, userId }, page, limit);
    context.ctx.status = 200;
    return reservationList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 예약 목록 조회 - 유저 마이페이지
const getUserReservations = async (root, args, context) => {
  try {
    const reservationList = await reservationService.getReservations({ userId: context.ctx.state.userId });
    context.ctx.status = 200;
    return reservationList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 단일 예약 조회 - 관리자 / 유저 마이페이지
const getOneReservation = async (root, args, context) => {
  let userId = null;
  if (args.input.userId) {
    userId = args.input.userId;
  } else {
    userId = context.ctx.state.userId;
  }
  try {
    const reservation = await reservationService.getSingleReservation({ reservationId: args.input.reservationId, userId });
    context.ctx.status = 200;
    return reservation;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 예약 취소 - 유저
const cancelReservation = async (root, args, context) => {
  try {
    if (!args.input.reservationId) {
      context.ctx.throw(400, 'please provide the reservation information');
    }
    const cancelledReservation = await reservationService.cancelReservation(args.input.reservationId);
    context.ctx.status = 200;
    return cancelledReservation;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 과거 예약 (종료된 예약) 목록 조회 - 관리자페이지
const getAdminOldReservations = async (root, args, context) => {
  const {
    page, limit, bookInfoId, userId,
  } = args.input;
  try {
    if (!page || !limit) {
      context.ctx.throw(400, 'you should provide page and limit');
    }
    if (!bookInfoId && !userId) {
      context.ctx.throw(400, 'you should provide information');
    }
    const oldReservationList = await reservationService.getOldReservations({ bookInfoId, userId }, page, limit);
    context.ctx.status = 200;
    return oldReservationList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 과거 예약 (종료된 예약) 목록 조회 - 유저 마이페이지
const getUserOldReservations = async (root, args, context) => {
  try {
    const reservationList = await reservationService.getOldReservations({ userId: context.ctx.state.userId });
    context.ctx.status = 200;
    return reservationList;
  } catch (err) { return context.ctx.throw(500, err); }
};

// 단일 과거 예약 조회 - 유저 마이페이지
const getOneOldReservation = async (root, args, context) => {
  try {
    const oldReservation = await reservationService.getSingleOldReservation(args.input.reservationId);
    context.ctx.status = 200;
    return oldReservation;
  } catch (err) { return context.ctx.throw(500, err); }
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
