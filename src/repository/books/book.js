const {
  sequelize, Book, BookInfo,
} = require('../../db/models');

const createBookTransaction = async (bookData) => {
  const {
    ISBN, title, author, publisher, publicationDate, thumbnailImage, pages, description, categoryId,
  } = bookData;
  const transaction = await sequelize.transaction();
  try {
    const [newBookInfo] = await BookInfo.findOrCreate({
      where: {
        ISBN,
      },
      defaults: {
        title,
        author,
        publisher,
        publicationDate,
        thumbnailImage,
        pages,
        description,
        categoryId,
      },
      transaction,
    });
    const newBook = Book.create({
      bookInfoId: newBookInfo.id,
      bookType: bookData.bookType,
      transaction,
    });
    await transaction.commit();
    return newBook;
  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

const getById = async (bookId) => {
  try {
    return Book.findByPk(bookId, {
      include: {
        model: BookInfo,
      },
    });
  } catch (err) { throw new Error(err.message); }
};

const getBooks = async (data) => {
  const where = {};
  if (data.bookInfoId) { where.bookInfoId = data.bookInfoId; }
  if (data.rentalState) { where.rentalState = data.rentalState.value; }
  try {
    return Book.findAll({
      where,
      include: {
        model: BookInfo,
      },
      order: [['createdAt', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const destroy = async (bookId) => {
  try {
    return Book.destroy({ where: { id: bookId }, truncate: false });
  } catch (err) { throw new Error(err.message); }
};

module.exports = {
  createBookTransaction, getBooks, getById, destroy,
};
