const express = require('express');
const passport = require('passport');
const cors = require('cors'); //sop오류방지를 위한 cors모듈 가져오기.
const router = express.Router();

router.use(cors()); //cors 적용

//local


//KAKAO
// /auth/kakao 경로 접근시 로그인 수행
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao의 결과를 get방식으로 /auth/kakao/call 전달해 성공과 실패시 이동할 경로 지정.
router.get('/kakao/callback',
  passport.authenticate('kakao', { successRedirect: '/',
                                  failureRedirect: '/error' }));


//facebook
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                  failureRedirect: '/error' }));

module.exports = router; //작성한 모듈 내보내기.