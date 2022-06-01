const DataLoader = require('dataloader');
const Sequelize = require('sequelize');
const { User, AdminUser } = require('../../../db/models');

const { Op } = Sequelize;

const userByIdLoader = () => new DataLoader(async (userIds) => {
  // console.log('bookIds', bookIds);
  const userList = await User.findAll({
    where: {
      id: { [Op.in]: userIds },
    },
  });
  return userList;
});

module.exports = {
  userByIdLoader,
};
