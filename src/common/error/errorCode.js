const STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_CODE = {
  AUTHORIZATION_INFO_MISSING: 'AUTHORIZATION_INFO_MISSING',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_VERIFY_FAIL: 'TOKEN_VERIFY_FAIL',
  LOGIN_FAIL: 'LOGIN_FAIL',
  NEED_LOGIN: 'NEED_LOGIN',
  INVALID_USER: 'INVALID_USER',
  USER_NOT_ADMIN: 'USER_NOT_ADMIN',
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_EXIST_USER: 'NOT_EXIST_USER',
  NOT_EXIST_BOOK: 'NOT_EXIST_BOOK',
  NOT_EXIST_RENTAL: 'NOT_EXIST_RENTAL',
  NOT_EXIST_BOOK_RETURN: 'NOT_EXIST_BOOK_RETURN',
  NOT_EXIST_RESERVATION: 'NOT_EXIST_RESERVATION',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
};

const ERROR_CODE_STATUS_MAPPING = {
  AUTHORIZATION_INFO_MISSING: STATUS_CODE.UNAUTHORIZED,
  EXPIRED_TOKEN: STATUS_CODE.UNAUTHORIZED,
  INVALID_TOKEN: STATUS_CODE.UNAUTHORIZED,
  TOKEN_VERIFY_FAIL: STATUS_CODE.UNAUTHORIZED,
  LOGIN_FAIL: STATUS_CODE.BAD_REQUEST,
  NEED_LOGIN: STATUS_CODE.UNAUTHORIZED,
  INVALID_USER: STATUS_CODE.FORBIDDEN,
  USER_NOT_ADMIN: STATUS_CODE.FORBIDDEN,
  INVALID_INPUT: STATUS_CODE.BAD_REQUEST,
  NOT_EXIST_BOOK: STATUS_CODE.NOT_FOUND,
  NOT_EXIST_USER: STATUS_CODE.NOT_FOUND,
  NOT_EXIST_RENTAL: STATUS_CODE.NOT_FOUND,
  NOT_EXIST_BOOK_RETURN: STATUS_CODE.NOT_FOUND,
  NOT_EXIST_RESERVATION: STATUS_CODE.NOT_FOUND,
  VALIDATION_ERROR: STATUS_CODE.BAD_REQUEST,
  SERVER_ERROR: STATUS_CODE.INTERNAL_SERVER_ERROR,
};

module.exports = { ERROR_CODE, ERROR_CODE_STATUS_MAPPING };
