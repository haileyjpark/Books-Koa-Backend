const { BookInfo } = require('../../db/models');

module.exports = {
  Query: {
    async bookInfos(root, args, context) {
      return BookInfo.findAll();
    },
  },
};
