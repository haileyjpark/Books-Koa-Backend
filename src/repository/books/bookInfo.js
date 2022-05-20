const Sequelize = require('sequelize');
const { BookInfo, Category } = require('../../db/models');

const { Op } = Sequelize;

const get = async () => {
  try {
    return BookInfo.findAll();
  } catch (err) { throw new Error(err.message); }
};

const getById = (bookInfoId) => {
  try {
    return BookInfo.findByPk(bookInfoId);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBookInfo = async (data) => {
  const {
    offset, limit, title, category, author,
  } = data;
  let where = {};
  if ((!title) && (!category) && (!author)) {
    where = {};
  } else {
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
  try {
    return BookInfo.findAll(
      {
        where,
        include: [{
          model: Category,
          attributes: ['categoryName'],
        }],
        limit,
        offset,
        order: [['publicationDate', 'DESC']],
      },
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  get, getById, getBookInfo,
};
