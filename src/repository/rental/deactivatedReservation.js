const {
  DeactivatedReservation,
} = require('../../db/models');

const getOldReservations = async (data) => {
  const where = {};
  if (data.userId) { where.userId = data.userId; }
  if (data.bookInfoId) { where.bookId = data.bookInfoId; }
  const oldReservations = await DeactivatedReservation.findAll({
    where,
    limit: data?.limit || 10,
    offset: data?.offset || 0,
    order: [['reservationEndDate', 'DESC']],
  });
  return oldReservations;
};

const getOne = async (data) => {
  const where = {};
  if (data.reservationCode) {
    where.reservationCode = data.reservationCode;
  }
  if (data.bookInfoId) {
    where.bookInfoId = data.bookInfoId;
  }
  if (data.userId) {
    where.userId = data.userId;
  }
  if (data.reservationId) {
    where.id = data.reservationId;
  }
  const oldReservationData = await DeactivatedReservation.findOne({ where });
  return oldReservationData;
};

module.exports = {
  getOldReservations, getOne,
};
