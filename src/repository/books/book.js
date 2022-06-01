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

const getBooks = async ({ limit, offset }, data) => {
  const { where } = bookQuery(data);

  const bookList = await Book.findAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  return bookList;
};

const getBooksWithBookInfo = async ({ limit, offset }, data) => {
  const { where } = bookQuery(data);
  const { bookInfoWhere } = bookQuery(data);

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
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  return bookList;
};

const getBookInfo = async ({ offset, limit }, data) => {
  const { where } = bookQuery(data);

  const bookInfo = await BookInfo.findAll({
    where,
    limit,
    offset,
    order: [['publicationDate', 'DESC']],
  });
  return bookInfo;
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
  getBookInfo,
  destroy,
};
