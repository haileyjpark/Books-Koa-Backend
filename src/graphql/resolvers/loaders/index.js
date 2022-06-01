const {
  bookLoader, bookInfoLoader, categoryLoader,
} = require('./bookLoader');

const loaders = {
  bookLoader: bookLoader(),
  categoryLoader: categoryLoader(),
  bookInfoLoader: bookInfoLoader(),
};

module.exports = loaders;
