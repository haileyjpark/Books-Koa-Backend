const Sequelize = require('sequelize');

const { Op } = Sequelize;
const {
  sequelize, Book, BookInfo, Category,
} = require('../../db/models');

const createBookTransaction = async (data) => {
  const {
    ISBN, title, author, publisher, publicationDate, thumbnailImage, pages, description, categoryId,
  } = data;
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
      bookType: data.bookType,
    }, { transaction });
    await transaction.commit();
    return newBook;
  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

const getOne = async (data) => {
  const where = {};
  if (data.bookId) {
    if (data.bookId) { where.id = data.bookId; }
  }
  const book = await Book.findOne({ where });
  return book;
};

const getOneWithBookInfo = async (bookId) => {
  const book = await Book.findByPk(bookId, {
    include: {
      model: BookInfo,
      include: [{
        model: Category,
        attributes: ['categoryName', 'parent'],
      }],
    },
  });
  return book;
};

const bookQuery = (data) => {
  const where = {};
  const {
    bookInfoId, rentalState,
  } = data;
  if (bookInfoId) {
    where.bookInfoId = bookInfoId;
  }
  if (rentalState) {
    where.rentalState = rentalState.value;
  }
  return where;
};

const bookInfoQuery = (data) => {
  let where = {};
  const {
    title, category, author, bookInfoId,
  } = data;
  if ((title) || (category) || (author)) {
    where = {
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
  return where;
};

const getBooks = async (data) => {
  const where = bookQuery(data);
  const bookList = await Book.findAll({
    where,
    limit: data.limit || 10,
    offset: data.offset || 0,
    order: [['createdAt', 'DESC']],
  });
  return bookList;
};

const getBooksWithBookInfo = async (data) => {
  const where = bookQuery(data);
  const bookInfoWhere = bookInfoQuery(data);

  const bookList = await Book.findAll({
    where,
    include: {
      model: BookInfo,
      where: bookInfoWhere,
      include: [{
        model: Category,
        attributes: ['categoryName', 'parent'],
      }],
    },
    limit: data.limit || 10,
    offset: data.offset || 0,
    order: [['createdAt', 'DESC']],
  });
  return bookList;
};

const getBookInfoList = async (data) => {
  const where = bookInfoQuery(data);
  const bookInfoList = await BookInfo.findAll({
    where,
    limit: data.limit || 10,
    offset: data.offset || 0,
    order: [['publicationDate', 'DESC']],
  });
  return bookInfoList;
};

const destroy = async (bookId) => {
  const deletedBook = await Book.destroy({
    where: { id: bookId },
    truncate: false,
  });
  return deletedBook;
};

module.exports = {
  createBookTransaction,
  getBooks,
  getBooksWithBookInfo,
  getOne,
  getOneWithBookInfo,
  getBookInfoList,
  destroy,
};
