const { User } = require('../../db/models');
const hash = require('../../common/util/hashPassword');

const findOrCreate = async (userData) => {
  try {
    const {
      email,
      password,
      userName,
      phoneNumber,
    } = userData;

    const encryptedPassword = await hash.hashPassword(password);
    const newUser = await User.findOrCreate({
      where: { email },
      defaults: {
        password: encryptedPassword,
        userName,
        phoneNumber,
      },
    });
    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getByEmail = async (email) => {
  try {
    return User.findOne({ where: { email } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (userId) => {
  try {
    return User.findByPk(userId);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  findOrCreate, getByEmail, getById,
};
