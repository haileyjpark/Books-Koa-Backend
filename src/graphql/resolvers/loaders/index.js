const {
  bookLoader, bookByIdLoader, bookInfoLoader, categoryLoader,
} = require('./bookLoader');
const {
  userByIdLoader,
} = require('./userLoader');

const loaders = {
  bookLoader: bookLoader(),
  bookByIdLoader: bookByIdLoader(),
  categoryLoader: categoryLoader(),
  bookInfoLoader: bookInfoLoader(),
  userByIdLoader: userByIdLoader(),
};

module.exports = loaders;
