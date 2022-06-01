const DataLoader = require('dataloader');
const Sequelize = require('sequelize');
const { Book, BookInfo, Category } = require('../../../db/models');

const { Op } = Sequelize;

const bookLoader = () => new DataLoader(async (bookInfoIds) => {
  const bookList = await Book.findAll({
    where: {
      bookInfoId: { [Op.in]: bookInfoIds },
    },
  });
  const bookLoaderResult = bookInfoIds.map((id) => bookList.filter((book) => book.bookInfoId === id));
  return bookLoaderResult;
});

const bookInfoLoader = () => new DataLoader(async (bookInfoIds) => {
  console.log('bookInfoIds', bookInfoIds);
  const bookInfoList = await BookInfo.findAll({
    where: {
      id: { [Op.in]: bookInfoIds },
    },
  });
  return bookInfoList;
});

const categoryLoader = () => new DataLoader(async (categoryIds) => {
  const categoryList = await Category.findAll({
    where: {
      id: { [Op.in]: categoryIds },
    },
  });
  return categoryList;
});

module.exports = {
  bookLoader, bookInfoLoader, categoryLoader,
};
