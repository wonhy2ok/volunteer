const express = require('express'); //express 웹 서버 구축
const logger = require('morgan'); //웹 요청 콘솔에 출력
const connect = require('./models'); //몽고디비 테이블 컬럼 정의 집합.
const cookieParser = require('cookie-parser'); //세션 쿠키등 요청에 동봉된 쿠키 해석 모듈.
const session = require('express-session'); //로그인 정보를 유지하기 위한 세션 모듈.
const passport = require('passport'); //로컬orSNS계정 로그인을 위한 passport모듈.

//라우터 가져오기
const errorRouter = require('./api/error')    //에러 라우터
const mailRouter = require('./api/mails');    //메일 라우터
const authjoinRouter = require('./api/authjoin'); //사용자 인증확인 라우터
const userRouter = require('./api/users');    //로그인 라우터
const passportConfig = require('./passport'); //passport라우터

const app = express();  //요청과 응답을 조작하는 익스프레스 패키지 생성.
connect();  //몽고디비 연결
passportConfig(passport); //passport

//웹요청을 콘솔에 출력
app.use(logger('dev'));

// 라우터 적용 전에 bodyParser 적용
app.use(express.json());

//쿠키 해석 모듈 적용 / 세션 적용.
app.use(cookieParser('201544071')); //쿠키 서명.
app.use(session({ //세션 적용
  resave: false,  //세션의 수정사항 발생시, 반영할지 결정. : 반영 안함.
  saveUninitialized: false, //세션에 저장내용이 없을 시, 세션을 기록할지 결정. : 기록 안함.
  secret: '2015440471', //서명된 쿠키에 반영
  cookie: {
    httpOnly: false,  //클라이언트에서 쿠키 확인 : 확인 가능.(개발용)
    secure: false,    //https가 아닌 환경에서도 사용 : 허락.
  },
}));

//passport모듈
app.use(passport.initialize()); //req객체에 passport 설정 담기.
app.use(passport.session());    //req.session 객체에 passport 정보 담기.

// 라우터 설정
app.use('/error', errorRouter); //에러 라우터 적용.
app.use('/mail', mailRouter);   //메일 라우터 적용.
app.use('/authjoin', authjoinRouter); //사용자 인증확인 라우터 적용.
app.use('/auth', userRouter);   //로그인 라우터 적용.
app.use('/', function(req, res, next) {
  console.log(JSON.stringify(req.user[0].snsId),JSON.stringify(req.user[0].name));
  res.write('success');
  res.end();
});

app.listen(4000, () => { //4000번 포트 접속
  console.log('listening to port 4000');
});