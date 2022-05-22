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

const getOne = async (data) => {
  const where = {};
  if (data.email) { where.email = data.email; }
  if (data.userId) { where.id = data.userId; }
  try {
    return User.findOne({ where });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  findOrCreate, getOne,
};
