const { userService } = require('../../services');

// 회원가입
const signUp = async (ctx) => {
  try {
    // 정규표현식 로직 추가 필요
    if (!ctx.request.body.email) {
      ctx.throw(400, 'please provide the email');
    }
    if (!ctx.request.body.password) {
      ctx.throw(400, 'please provide the password');
    }
    const createdUser = await userService.findOrCreateUser(ctx.request.body);
    if (createdUser) {
      ctx.body = 'Signup successful!';
    }
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 로그인
const signIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    if (!email) {
      ctx.throw(400, 'please provide the email');
    }
    if (!password) {
      ctx.throw(400, 'please provide the password');
    }
    const token = await userService.signInService(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

/*
현재는 AdminUser/User용 회원가입/로그인 API가 분리되어 있지 않아서 현재는 회원가입, 로그인 시에 userType값을 입력받아야 하는데,
 (userType:admin일 경우에는 AdminUser 테이블에 회원정보가 저장되고, 로그인 시에도 userType: admin일 경우에만 AdminUser테이블에서 조회.)
 이 부분 어떻게 수정하면 좋을 지 생각해보겠습니다.
 */

/*
다음 PR에 반영할 사항들
1. 중복 로그인 방지
2. refresh token
3. 로그아웃
4. 회원 탈퇴 - 회원정보 삭제하지 않고 state로 추가
4. 정규표현식 검증 적용
5. 유저 정보 업데이트
6. 유저 정보 조회
*/

module.exports = { signUp, signIn };
