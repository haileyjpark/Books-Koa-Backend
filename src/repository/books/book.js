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
      transaction,
    });
    await transaction.commit();
    const newBookWithBookInfo = await Book.findByPk(newBook.id, {
      include: {
        model: BookInfo,
        include: {
          model: Category,
        },
      },
    });
    return newBookWithBookInfo;
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
  let bookInfoWhere = {};
  const {
    offset, limit, title, category, author,
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

const destroy = async (bookId) => {
  try {
    return Book.destroy({ where: { id: bookId }, truncate: false });
  } catch (err) { throw new Error(err.message); }
};

module.exports = {
  createBookTransaction, getBooks, getById, destroy,
};
