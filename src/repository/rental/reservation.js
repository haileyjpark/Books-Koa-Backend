const {
  sequelize, Reservation, DeactivatedReservation,
} = require('../../db/models');

const create = async (data) => {
  // 예약 코드 중복 검사 추가 필요
  const { reservationCode, bookInfoId, userId } = data;
  const newReservation = await Reservation.create(
    { reservationCode, bookInfoId, userId },
  );
  return newReservation;
};

const getReservations = async (data) => {
  const where = {};

  if (data.userId) { where.userId = data.userId; }
  if (data.bookInfoId) { where.bookInfoId = data.bookInfoId; }
  const reservations = await Reservation.findAll({
    where,
    limit: (data?.limit || 10),
    offset: data?.offset || 0,
    order: [['createdAt', 'DESC']],
  });
  return reservations;
};

const getOne = async (data) => {
  const {
    userId, bookInfoId, reservationId, reservationCode,
  } = data;
  const where = {};
  if (reservationCode) {
    where.reservationCode = reservationCode;
  }
  if (bookInfoId) {
    where.bookInfoId = bookInfoId;
  }
  if (userId) {
    where.userId = userId;
  }
  if (reservationId) {
    where.id = reservationId;
  }
  const reservationData = await Reservation.findOne({ where });
  return reservationData;
};

// 예약 취소 트랜잭션
const cancelTransaction = async (data) => {
  const {
    reservationCode, bookInfoId, userId, reservedDate,
  } = data;
  const transaction = await sequelize.transaction();
  try {
    // 예약 코드 중복 검사 추가 필요
    await Reservation.destroy({
      where: { bookInfoId, userId },
      truncate: false,
      transaction,
    });
    const cancelledReservation = await DeactivatedReservation.create({
      reservationCode, bookInfoId, userId, reservationStartDate: reservedDate, state: 'CANCELLED',
    }, { transaction });
    await transaction.commit();
    return cancelledReservation;
  } catch (err) {
    await transaction.rollback();
    return err.message;
  }
};

module.exports = {
  create, getReservations, getOne, cancelTransaction,
};
