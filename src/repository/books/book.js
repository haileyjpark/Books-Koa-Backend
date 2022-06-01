const Sequelize = require('sequelize');

const { Op } = Sequelize;
const {
  sequelize, Book, BookInfo, Category,
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
    const newBook = await Book.create({
      bookInfoId: newBookInfo.id,
      bookType: bookData.bookType,
    }, { transaction });
    await transaction.commit();
    return newBook;
  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

const getBookWithBookInfoById = async (bookId) => {
  try {
    return Book.findByPk(bookId, {
      include: {
        model: BookInfo,
        include: [{
          model: Category,
          attributes: ['categoryName', 'parent'],
        }],
      },
    });
  } catch (err) { throw new Error(err.message); }
};

const getBookById = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);
    return book;
  } catch (err) { throw new Error(err.message); }
};

const bookQuery = (data) => {
  const where = {};
  let bookInfoWhere = {};
  const {
    title, category, author,
  } = data;

  if (data) {
    if (data.bookInfoId) { where.bookInfoId = data.bookInfoId; }
    if (data.rentalState) { where.rentalState = data.rentalState.value; }
  }

  if ((!title) && (!category) && (!author)) {
    bookInfoWhere = {};
  } else {
    bookInfoWhere = {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
        {
          author: {
            [Op.like]: `%${author}%`,
          },
        },
        {
          '$Category.categoryName$': {
            [Op.like]: `%${category}%`,
          },
        },
      ],
    };
  }
  return { where, bookInfoWhere };
};

const getBooksWithBookInfo = async (data) => {
  const { where } = bookQuery(data);
  const { bookInfoWhere } = bookQuery(data);
  const {
    limit, offset,
  } = data;
  try {
    return Book.findAll({
      where,
      include: {
        model: BookInfo,
        where: bookInfoWhere,
        include: [{
          model: Category,
          attributes: ['categoryName', 'parent'],
        }],
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBooks = async (data) => {
  const { where } = bookQuery(data);
  const {
    limit, offset,
  } = data;
  try {
    const books = await Book.findAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return books;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBookInfo = async (data) => {
  const { where } = bookQuery(data);
  const {
    limit, offset,
  } = data;
  try {
    const bookInfos = await BookInfo.findAll({
      where,
      limit,
      offset,
      order: [['publicationDate', 'DESC']],
    });
    return bookInfos;
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
  createBookTransaction,
  getBooks,
  getBooksWithBookInfo,
  getBookWithBookInfoById,
  getBookById,
  getBookInfo,
  destroy,
};
