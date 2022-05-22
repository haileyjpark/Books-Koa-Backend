const bcrypt = require('bcrypt');

const { SALT_ROUND } = process.env;

// 비밀번호 암호화
const hashPassword = async (password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
  } catch (err) {
    throw new Error(err.message);
  }
};

// 비밀번호 검사
const comparePassword = async (password, hash) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { hashPassword, comparePassword };
