const {
  DeactivatedReservation,
} = require('../../db/models');

const getOldReservations = async (data, offset, limit) => {
  try {
    const where = {};
    if (data.userId) { where.userId = data.userId; }
    if (data.bookInfoId) { where.bookId = data.bookInfoId; }
    const oldReservations = await DeactivatedReservation.findAll(
      {
        where, limit: limit || 10, offset: offset || 0, order: [['createdAt', 'DESC']],
      },
    );
    return oldReservations;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOne = async (data) => {
  let oldReservationData = null;
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
    oldReservationData = await DeactivatedReservation.findOne({ where });
    return oldReservationData;
  } catch (err) {
    if (!oldReservationData) {
      return oldReservationData;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  getOldReservations, getOne,
};
