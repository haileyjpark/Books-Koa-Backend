const bcrypt = require('bcrypt');

const { SALT_ROUND } = process.env;
const { CustomError, ERROR_CODE } = require('../error');

// 비밀번호 암호화
const hashPassword = async (password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUND));
    return hashedPassword;
  } catch (err) {
    throw new CustomError(ERROR_CODE.HASH_FAIL, err.message, '[HASH_PW/HASH_FAIL]');
  }
};

// 비밀번호 검사
const comparePassword = async (password, hash) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return bcrypt.compare(password, hash);
  } catch (err) {
    throw new CustomError(ERROR_CODE.HASH_FAIL, err.message, '[HASH_PW/HASH_FAIL]');
  }
};

module.exports = { hashPassword, comparePassword };
