const { AdminUser } = require('../../db/models');
const hash = require('../../common/util/hashPassword');

const findOrCreate = async (userData) => {
  try {
    const {
      email, password, userName, phoneNumber,
    } = userData;
    const encryptedPassword = await hash.hashPassword(password);
    const newAdminUser = await AdminUser.findOrCreate({
      where: { email },
      defaults: { password: encryptedPassword, userName, phoneNumber },
    });
    return newAdminUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOne = async (data) => {
  const where = {};
  if (data.email) { where.email = data.email; }
  if (data.adminUserId) { where.id = data.adminUserId; }
  try {
    return AdminUser.findOne({ where });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { findOrCreate, getOne };
