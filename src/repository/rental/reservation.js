const {
  sequelize, Reservation, DeactivatedReservation,
} = require('../../db/models');

const create = async (reservationData, bookInfoId, userId) => {
  // 예약 코드 중복 검사 추가 필요
  try {
    const newReservation = await Reservation.create(
      { reservationCode: reservationData.reservationCode, bookInfoId, userId },
    );
    return newReservation;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getReservations = async (data, offset, limit) => {
  try {
    const where = {};
    if (data.userId) { where.userId = data.userId; }
    if (data.bookInfoId) { where.bookInfoId = data.bookInfoId; }
    const reservations = await Reservation.findAll(
      {
        where, limit: limit || 10, offset: offset || 0, order: [['createdAt', 'DESC']],
      },
    );
    return reservations;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOne = async (data) => {
  try {
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
  } catch (err) {
    throw new Error(err.message);
  }
};

// 예약 취소 트랜잭션
const cancelTransaction = async (reservationData) => {
  const {
    reservationCode, bookInfoId, userId, reservationStartDate,
  } = reservationData;
  const transaction = await sequelize.transaction();
  try {
    // 예약 코드 중복 검사 추가 필요
    await Reservation.destroy(
      {
        where: { bookInfoId, userId },
        truncate: false,
        transaction,
      },
    );
    const cancelledReservation = await DeactivatedReservation.create({
      reservationCode, bookInfoId, userId, reservationStartDate, state: 'CANCELLED', transaction,
    });
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
