const DataLoader = require('dataloader');
const Sequelize = require('sequelize');
const { User } = require('../../../db/models');

const { Op } = Sequelize;

const userByIdLoader = () => new DataLoader(async (userIds) => {
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
