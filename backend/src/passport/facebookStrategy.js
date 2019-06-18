const facebookStrategy = require('passport-facebook').Strategy;

//const { User } = require('../models/user');

module.exports = (passport) => {
    passport.use(new facebookStrategy({
        clientID: '2344329405841912', //facebook API키 등록
        clientSecret: '7141653b1002485baceedfdf87fbac73', //시크릿 코드 등록
        callbackURL: "/auth/facebook/callback" //요청 결과에 따른 callbackURL 지정
      },
      function(accessToken, refreshToken, profile, done) {
        /*
        User.findOrCreate(..., function(err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
        */
      }
    ));
}
