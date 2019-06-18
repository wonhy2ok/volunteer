const express = require('express');
const Mail = require('../models/mail');
const axios = require('axios');
const crypto = require('crypto');

const router = express.Router();

var isEmpty = function(value){ if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ return true }else{ return false } };

router.get('/:id', async function(req, res, next) {
    Mail.find({email: req.query.email, token: req.query.token})
    .then((emails) => {
        if( isEmpty(emails) ){
            console.log("비어 있음");
        }
        else {
            console.log('req파리미터:',req.params,'쿼리이메일' ,req.query.email, '전달객체',emails);
            res.json(emails);  //화면 출력
            //http://localhost:3000/authjoin/auth?name=%EC%A0%95%EC%9B%90%ED%98%81&email=cjswo7119@naver.com&token=341
            console.log('http://localhost:3000/authjoin/auth?email='+req.query.email+"&name="+emails[0].name+"&token="+emails[0].token);
            /* axios({
                url: 'http://localhost:3000/authjoin/?email='+req.query.email+"&name="+emails[0].name,
                method: 'get'
            }).then(res => {
                console.log('전송 성공');
            })
            .catch(
                function(error) {
                    console.log(error);
                }
            ); */
            /* axios.get('http://localhost:3000/authjoin/', {
                params: {
                    email: req.query.email,
                    name: emails[0].name
                }
            }); */
            //res.redirect('http://localhost:3000/');
            next();
        }
    })
    .catch((err) => {
        console.log("여기");
        //next(err);
    });
    //query 연습용 : { id: 'auth' } { email: 'cjswo7119@naver.com', token: '354' }
    //http://localhost:4000/mail/auth?email=cjswo7119@naver.com&token=354
});

router.get('/:id', async function(req, res, next) {
    axios.get('http://localhost:3000/authjoin/', {
        params: {
            email: req.query.email,
            name: emails[0].name
        }
    });
});

// 라우터를 내보내기.
module.exports = router;