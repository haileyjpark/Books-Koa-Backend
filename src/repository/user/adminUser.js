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

const getByEmail = async (email) => {
  try {
    return AdminUser.findOne({ where: { email } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = (adminUserId) => {
  try {
    return AdminUser.findByPk(adminUserId);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { findOrCreate, getByEmail, getById };
