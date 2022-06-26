const jwt = require('jsonwebtoken');
const { userRepository, adminUserRepository } = require('../../repository');
const { CustomError, ERROR_CODE } = require('../error');

const {
  SECRET_KEY,
  REFRESH_SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = process.env;

// 액세스 토큰 생성
const issue = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_ACCESS_EXPIRES_IN });
};

// 리프레시 토큰 생성
const refresh = () => jwt.sign({}, SECRET_KEY, { expiresIn: JWT_REFRESH_EXPIRES_IN });

// 토큰 검사
const verify = (accessToken) => {
  try {
    const decodedToken = jwt.verify(accessToken, SECRET_KEY);
    return decodedToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new CustomError(ERROR_CODE.EXPIRED_TOKEN, 'The accessToken is expired', '[JWT/EXPIRED_TOKEN]');
    }
    if (err.name === 'JsonWebTokenError') {
      throw new CustomError(ERROR_CODE.INVALID_TOKEN, 'The accessToken is invalid', '[JWT/INVALID_TOKEN]');
    }
    throw new CustomError(ERROR_CODE.TOKEN_VERIFY_FAIL, `TokenError: ${err.message}`, '[TOKEN_VERIFY_FAIL]');
  }
};

const refreshVerify = async (refreshToken, userId) => {
  try {
    const user = await userRepository.getOne(userId)
    || await adminUserRepository.getOne(userId);
    if (user.refreshToken !== refreshToken) {
      return { ok: false };
    }
    const decodedToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    return decodedToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new CustomError(ERROR_CODE.EXPIRED_TOKEN, 'The refreshToken is expired', '[JWT/EXPIRED_TOKEN]');
    }
    if (err.name === 'JsonWebTokenError') {
      throw new CustomError(ERROR_CODE.INVALID_TOKEN, 'The refreshToken is invalid', '[JWT/INVALID_TOKEN]');
    }
    throw new CustomError(ERROR_CODE.TOKEN_VERIFY_FAIL, `TokenError: ${err.message}`, '[TOKEN_VERIFY_FAIL]');
  }
};

module.exports = {
  issue, refresh, verify, refreshVerify,
};
