const { reservationService } = require('../../services');

// 예약 데이터 생성 - 유저
const createReservation = async (ctx) => {
  try {
    if (!ctx.request.body || !ctx.params.bookInfoId) {
      ctx.throw(400, 'please provide the book information');
    }
    ctx.body = await reservationService.createReservation(
      ctx.request.body,
      ctx.params.bookInfoId,
      ctx.state.userId,
    );
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 예약 목록 조회 - 관리자페이지
const getAdminReservations = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { bookInfoId, userId } = ctx.request.query;
  try {
    if ((!userId) && (!page || !limit)) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await reservationService.getReservations({ bookInfoId, userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 예약 목록 조회 - 유저 마이페이지
const getUserReservations = async (ctx) => {
  try {
    ctx.body = await reservationService.getReservations({ userId: ctx.state.userId });
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 단일 예약 조회 - 관리자 / 유저 마이페이지
const getSingleReservation = async (ctx) => {
  try {
    let userId = null;
    if (ctx.request.query.userId) {
      userId = ctx.request.query.userId;
    } else {
      userId = ctx.state.userId;
    }
    const { reservationId } = ctx.params;

    ctx.body = await reservationService.getSingleReservation({ reservationId, userId });
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 예약 취소 - 유저
const cancelReservation = async (ctx) => {
  try {
    if (!ctx.params.bookInfoId) {
      ctx.throw(400, 'please provide the bookInfo information');
    }
    ctx.body = await reservationService.cancelReservation(
      ctx.state.userId,
      ctx.params.bookInfoId,
    );
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 과거 예약 (종료된 예약) 목록 조회 - 관리자페이지
const getAdminOldReservations = async (ctx) => {
  const page = parseInt(ctx.request.query.page, 10);
  const limit = parseInt(ctx.request.query.limit, 10);
  const { bookInfoId, userId } = ctx.request.query;
  try {
    if ((!userId) && (!page || !limit)) {
      ctx.throw(400, 'you should provide page and limit');
    }
    ctx.body = await reservationService.getOldReservations({ bookInfoId, userId }, page, limit);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 과거 예약 (종료된 예약) 목록 조회 - 유저 마이페이지
const getUserOldReservations = async (ctx) => {
  const { userId } = ctx.state;
  try {
    ctx.body = await reservationService.getOldReservations({ userId });
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

// 단일 과거 예약 조회 - 유저 마이페이지
const getSingleOldReservation = async (ctx) => {
  try {
    ctx.body = await reservationService.getSingleOldReservation(ctx.params.reservationId);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

module.exports = {
  createReservation,
  cancelReservation,
  getAdminReservations,
  getUserReservations,
  getSingleReservation,
  getAdminOldReservations,
  getUserOldReservations,
  getSingleOldReservation,
};
