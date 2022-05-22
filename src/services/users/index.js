const { userRepository, adminUserRepository } = require('../../repository/index');
const { JwtService } = require('../../common/auth/index');
const hashService = require('../../common/util/hashPassword');

const EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;

// 유저 데이터 생성 (회원 가입)
const findOrCreateUser = async (userData) => {
  try {
    const [user, created] = (userData.userType === 'ADMIN')
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
const signInService = async (userData) => {
  try {
    const { email, password, userType } = userData;
    const user = (userType === 'ADMIN')
      ? await adminUserRepository.getOne({ email })
      : await userRepository.getOne({ email });

    const matched = await hashService.comparePassword(password, user.password);
    if (!matched || !user) {
      return 'Login failed';
    }
    const Authorization = await JwtService.issue({ payload: { user: user.id } }, EXPIRES_IN);
    return { Authorization };
  } catch (err) { throw new Error(err.message); }
};

module.exports = {
  findOrCreateUser, signInService,
};
