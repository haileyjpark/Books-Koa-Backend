/* eslint-disable max-len */
const {
  sequelize, BookReturn, BookRental, Book, User,
} = require('../../db/models');

// 반납시 유저테이블 연체 처리 로직 (모듈화 하였음) -> (이 로직은 더 단순화할 수 있는 방법을,,,, 생각해보겠습니다...!)
const createAvailableRentalDate = async (userId, returnDueDate, today) => {
  const user = await User.findByPk(userId);
  let newDate = '';
  const dateDifference = (newDay, oldDay) => parseInt(Math.abs(newDay - oldDay) / (1000 * 3600 * 24), 10);
  // 유저의 대출가능일이 오늘보다 이전일 경우 - 대출가능일을 오늘 + 연체일로 업데이트
  if (user.availableRentalDate < today) {
    const availableRentalDate = new Date(today);
    newDate = availableRentalDate.setDate(
      today.getDate() + dateDifference(today, returnDueDate),
    );
    // 유저의 대출가능일이 오늘 이후일 경우 - 대출가능일을 대출가능일 + 연체일로 업데이트
  } else if (user.availableRentalDate > today) {
    const availableRentalDate = new Date(user.availableRentalDate);
    newDate = new Date(availableRentalDate.setDate(
      user.availableRentalDate.getDate() + dateDifference(today, returnDueDate),
    ));
  }
  return newDate;
};

// 반납 트랜잭션 로직
const createReturnTransaction = async (rentalData) => {
  const {
    rentalCode, rentalDate, returnDueDate, bookId, userId, extension,
  } = rentalData;
  const transaction = await sequelize.transaction();
  try {
    const newBookReturn = await BookReturn.create({
      rentalCode,
      rentalDate,
      bookId,
      userId,
      extension,
      transaction,
    });

    await BookRental.destroy({
      where: { bookId },
      truncate: false,
      transaction,
    });

    await Book.update({
      rentalState: true,
    }, {
      where: { id: bookId },
      transaction,
    });

    // 연체되었을 경우
    const today = new Date();
    if (returnDueDate < today) {
      const newDate = await createAvailableRentalDate(userId, returnDueDate, today);

      await User.update({
        availableRentalDate: newDate,
      }, {
        where: {
          id: userId,
        },
        transaction,
      });
    }
    await transaction.commit();
    return newBookReturn;
  } catch (err) {
    await transaction.rollback();
    return err.message;
  }
};

const getOne = async (data) => {
  try {
    const where = {};
    if (data.bookId) { where.bookId = data.bookId; }
    if (data.userId) { where.userId = data.userId; }
    if (data.rentalId) { where.rentalId = data.rentalId; }

    return BookReturn.findOne({ where });
  } catch (err) { throw new Error(err.message); }
};

const getBookReturns = async (data, offset, limit) => {
  const where = {};
  if (data.userId) { where.userId = data.userId; }
  try {
    return BookReturn.findAll({
      where, limit: limit || 10, offset: offset || 0, order: [['returnDate', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createReturnTransaction, getOne, getBookReturns,
};
