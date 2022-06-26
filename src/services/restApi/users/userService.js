const { userRepository, adminUserRepository } = require('../../../repository/index');
const { JwtService } = require('../../../common/auth/index');
const hashService = require('../../../common/util/hashPassword');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 유저 데이터 생성 (회원 가입)
const findOrCreateUser = async (userData) => {
  const [user, created] = (userData.userType === 'ADMIN')
    ? await adminUserRepository.findOrCreate(userData)
    : await userRepository.findOrCreate(userData);
  if (!created) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, 'The email provided is already exists', '[restAPI/services/signUp/INVALID_INPUT]');
  }
  return user;
};

// 로그인 로직
const adminSignInService = async (userData) => {
  const { email, password } = userData;
  const user = await adminUserRepository.getOne({ email });
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_USER, 'User does not exist', '[restAPI/services/adminSignIn/NOT_EXIST_USER]');
  }
  const matched = await hashService.comparePassword(password, user.password);
  if (!matched) {
    throw new CustomError(ERROR_CODE.LOGIN_FAIL, 'Login failed', '[restAPI/services/adminSignIn/LOGIN_FAIL]');
  }
  const accessToken = JwtService.issue({ id: user.id, role: 'ADMIN' });
  const refreshToken = JwtService.refresh();
  const updateToken = await adminUserRepository.updateRefreshToken({ userId: user.id, refreshToken });
  return { Authorization: { accessToken, refreshToken } };
};

const userSignInService = async (userData) => {
  const { email, password } = userData;
  const user = await userRepository.getOne({ email });
  if (!user) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_USER, 'User does not exist', '[restAPI/services/userSignIn/NOT_EXIST_USER]');
  }
  const matched = await hashService.comparePassword(password, user.password);
  if (!matched) {
    throw new CustomError(ERROR_CODE.LOGIN_FAIL, 'Login failed', '[restAPI/services/userSignIn/LOGIN_FAIL]');
  }
  const accessToken = JwtService.issue({ id: user.id, role: 'USER' });
  const refreshToken = JwtService.refresh();
  const updateToken = await userRepository.updateRefreshToken({ userId: user.id, refreshToken });
  return { Authorization: { accessToken, refreshToken } };
};

module.exports = {
  findOrCreateUser, adminSignInService, userSignInService,
};
