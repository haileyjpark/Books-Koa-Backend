const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
// 토큰 생성
const issue = async (payload, expiresIn) => jwt.sign(payload, SECRET_KEY, {
  expiresIn,
});

// 토큰 검사
const verify = async (ctx, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(419, 'The Token is expired');
    }
    if (err.name === 'JsonWebTokenError') {
      ctx.throw(401, 'The Token is invalid');
    }
    throw err.message;
  }
};

module.exports = { issue, verify };
