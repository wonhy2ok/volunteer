//const local = require('./localStrategy');
const facebook = require('./facebookStrategy'); //facebook 라우터
const kakao = require('./kakaoStrategy');       //카카오톡 라우터
const User = require('../models/user');         //몽고디비에 저장될 사용자컬럼 정의

module.exports = (passport) => {
    passport.serializeUser((user, done) => {    //req.session객체에 담을 데이터 선택.
        done(null, user.id);    //1번째 인자는 에러발생시, 2번째 인자는 사용자 정보 중 id를 세션 객체에 저장.
    });

    passport.deserializeUser((id, done) => {    //passport.session을 통해 데이터를 불러올때 사용자 정보 전달.
        User.find({ "id": id })   //해당하는 id의 사용자 정보 조회
        .then(user => {         //정보가 있다면
            done(null, user)})  //request로 req.user에 정보를 전달.
        .catch(err => done(err));//정보가 없다면 오류 수행.
    });
    //local(passport);    //로컬 로그인
    kakao(passport);    //카카오로 로그인
    facebook(passport); //페이스북 로그인
}

