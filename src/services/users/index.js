const { userRepository, adminUserRepository } = require('../../repository/index');
const { JwtService } = require('../../common/auth/index');
const hashService = require('../../common/util/hashPassword');

// 유저 데이터 생성 (회원 가입)
const findOrCreateUser = async (userData) => {
  try {
    const [user, created] = (userData.userType === 'admin')
      ? await adminUserRepository.findOrCreate(userData)
      : await userRepository.findOrCreate(userData);
    if (!created) {
      throw Error('The email provided is already exists');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// 로그인 로직
const signInService = async (email, password, userType) => {
  try {
    const user = (userType === 'admin')
      ? await adminUserRepository.getByEmail(email)
      : await userRepository.getByEmail(email);
    if (!user) {
      return 'User email doesn\'t exist';
    }
    const matched = await hashService.comparePassword(password, user.password);
    if (!matched) {
      return 'invalid password';
    }
    const Authorization = await JwtService.issue({ payload: { user: user.id } }, '1d');
    return { Authorization };
  } catch (err) { throw new Error(err.message); }
};

module.exports = {
  findOrCreateUser, signInService,
};
