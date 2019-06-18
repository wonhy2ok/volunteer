const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID: 'b9963a43d68a59cb777ee83cc4323fed', //카카오API를 사용하기 위한 apiID
        callbackURL: "/auth/kakao/callback" //요청된 정보의 성공과 실패를 구분해주는 callbackURL
      },
      (accessToken, refreshToken, profile, done) => { //profile:카카오톡에서 전달하는 사용자정보,
        console.log(profile);
        /*try{
          const kakaoUser = User.find({id: String(profile.id), provider: 'kakao'});
          console.log("kakaoUser",kakaoUser);
          if(kakaoUser) {
            done(null, kakaoUser);
          }else {
            const newUser = new User({
              id: String(profile.id),
              name: profile.username,
              provider: profile.provider,
              snsId: profile._json.kaccount_email,
              password: null
            });
            console.log("newUser",newUser);
            newUser.save()
            .then((result) => {
              console.log(result);
              done(null, newUser);
            })
            .catch((err) => {     //실패 즉, 서버 오류
              console.error(err); //실패 내용 콘솔 출력
              done(err);
            });
          }
        }catch(err) {
           console.error(err);
        }*/
        //몽고디비에 전달할 카카오톡 사용자 객체 생성.
        const newUser = new User({
          id: String(profile.id), //이때의 카카오 아이디는 int형이기 때문에 문자열 변환.
          name: profile.username, //카카오 계정 이름
          provider: profile.provider, //카카오에서 제공된 정보임을 알리는 출처정보.
          snsId: profile._json.kaccount_email, //카카오 사용자 이메일
          password: null  //비밀번호는 null
        });
        newUser.save()  //새 카카오 계정 몽고디비 전송.
        .then((result) => {
          console.log(result);  //성공 내용 콘솔 출력
          done(null, newUser);  //새로운 카카오 계정 로그인
        })
        .catch((err) => {     //실패 즉, 서버 오류이거나 이미 사용자가 존재할 때
          console.error(err); //실패 내용 콘솔 출력
          done(null, profile);//이미 가입된 사용자 카카오 계정 로그인
        });
      }
    ));
}
