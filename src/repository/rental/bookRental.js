const {
  sequelize, BookRental, Book, Reservation,
} = require('../../db/models');

const getOne = async (data) => {
  const where = {};
  if (data.rentalCode) { where.rentalCode = data.rentalCode; }
  if (data.bookId) { where.bookId = data.bookId; }
  if (data.rentalId) { where.id = data.rentalId; }
  try {
    return BookRental.findOne({
      where,
      include: {
        model: Book,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const createRentalTransaction = async (singleRental) => {
  const { rentalCode, userId, bookId } = singleRental;
  // 대출 코드 validation을 어느 레이어에서 핸들링 해줘야할지 고민
  // (db에서는 unique:true 옵션이 있으므로 중복 저장이 되기 전에 Validation Error발생)
  // findOrCreate를 해줘야 할 지? -> 클라이언트에서 중복값을 주지는 않겠지만...
  const rental = await getOne({ rentalCode });
  if (rental) {
    throw new Error('이미 존재하는 대출 코드입니다.');
  }
  const book = await Book.findByPk(bookId);
  const { bookInfoId } = book;

  const today = new Date();
  const returnDueDate = new Date(today);
  returnDueDate.setDate(today.getDate() + 11);
  returnDueDate.setHours(0,0,0,0);

  const reservation = await Reservation.findOne({
    where: {
      userId,
      bookInfoId,
    },
  });
  const transaction = await sequelize.transaction();
  try {
    if (reservation) {
      Reservation.destroy({
        where: {
          userId, bookInfoId,
        },
        truncate: false,
        transaction,
      });
    }
    const newRental = await BookRental.create({
      rentalCode,
      userId,
      returnDueDate,
      bookId,
      transaction,
    });
    await Book.update({
      rentalState: true,
    }, {
      where: { id: bookId },
      transaction,
    });
    await transaction.commit();
    return newRental;
  } catch (err) {
    await transaction.rollback();
    return err.message;
  }
};

const getRentals = async (data, offset, limit) => {
  const where = {};
  if (data.userId) { where.userId = data.userId; }
  try {
    return BookRental.findAll({
      where, limit: limit || 10, offset, order: [['createdAt', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getByBookInfoId = async (bookInfoId) => {
  try {
    return BookRental.findAll({
      include: {
        model: Book,
        attributes: ['bookInfoId'],
        where: {
          bookInfoId,
        },
        order: [['createdAt', 'DESC']],
      },
    });
  } catch (err) { throw new Error(err.message); }
};

const extend = async (rentalId) => {
  try {
    const rentalData = await BookRental.findByPk(rentalId);
    const { returnDueDate } = rentalData;
    await returnDueDate.setDate(returnDueDate.getDate() + 11 )
    await returnDueDate.setHours(0,0,0,0);
    return BookRental.update({
      extension: rentalData.extension + 1,
      returnDueDate,
    }, {
      where:
      { id: rentalId },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getRentals, getByBookInfoId, getOne, extend, createRentalTransaction,
};
