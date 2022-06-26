const { AdminUser } = require('../../db/models');
const hash = require('../../common/util/hashPassword');

const findOrCreate = async (data) => {
  const {
    email, password, userName, phoneNumber,
  } = data;
  const encryptedPassword = await hash.hashPassword(password);
  const newAdminUser = await AdminUser.findOrCreate({
    where: { email },
    defaults: { password: encryptedPassword, userName, phoneNumber },
  });
  return newAdminUser;
};

const updateRefreshToken = async (data) => {
  const { adminUserId, refreshToken } = data;
  const updateToken = await AdminUser.update({ refreshToken }, { where: { id: adminUserId } });
  return updateToken;
};

const getOne = async (data) => {
  const where = {};
  if (data.email) { where.email = data.email; }
  if (data.adminUserId) { where.id = data.adminUserId; }

  return AdminUser.findOne({ where });
};

module.exports = { findOrCreate, getOne, updateRefreshToken };
