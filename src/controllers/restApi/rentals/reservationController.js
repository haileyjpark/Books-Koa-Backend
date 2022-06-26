const { reservationService } = require('../../../services/restApi');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 예약 데이터 생성 - 유저
const createReservation = async (ctx) => {
  try {
    const { reservationCode, bookInfoId } = ctx.request.body;
    if (!reservationCode) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the reservationCode');
    }
    if (!bookInfoId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the bookInfoId');
    }
    ctx.body = await reservationService.createReservation({
      reservationCode,
      bookInfoId,
      userId: ctx.state.userId,
    });
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 예약 목록 조회 - 관리자페이지
const getAdminReservations = async (ctx) => {
  const {
    bookInfoId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    if (!userId && !bookInfoId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    ctx.body = await reservationService.getReservations({
      bookInfoId,
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 예약 목록 조회 - 유저 마이페이지
const getUserReservations = async (ctx) => {
  try {
    ctx.body = await reservationService.getReservations({ userId: ctx.state.userId });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 예약 조회 - 관리자 / 유저 마이페이지
const getOneReservation = async (ctx) => {
  try {
    ctx.body = await reservationService.getOneReservation(ctx.params.reservationId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 예약 취소 - 유저
const cancelReservation = async (ctx) => {
  try {
    const { reservationId } = ctx.params;
    if (!reservationId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the reservation information');
    }
    ctx.body = await reservationService.cancelReservation(reservationId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 과거 예약 (종료된 예약) 목록 조회 - 관리자페이지
const getAdminOldReservations = async (ctx) => {
  const {
    bookInfoId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit');
    }
    if (!userId && !bookInfoId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information');
    }
    ctx.body = await reservationService.getOldReservations({
      bookInfoId,
      userId,
      page,
      limit,
    });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 과거 예약 (종료된 예약) 목록 조회 - 유저 마이페이지
const getUserOldReservations = async (ctx) => {
  const { userId } = ctx.state;
  try {
    ctx.body = await reservationService.getOldReservations({ userId });
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 과거 예약 조회 - 유저 마이페이지
const getOneOldReservation = async (ctx) => {
  try {
    ctx.body = await reservationService.getOneOldReservation(ctx.params.reservationId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
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
