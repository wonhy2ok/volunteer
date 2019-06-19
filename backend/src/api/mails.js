const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); //sop오류방지를 위한 cors모듈 가져오기.
const Mail = require('../models/mail');

const router = express.Router();
router.use(cors()); //cors 적용
router.get('/', function(req, res, next) {
    res.write('get /mail  Test');
    res.end();
});

const mail = new Mail({
    email: '',  //화면에서 작성한 email
    name: '',    //화면에서 작성한 성명
    state: '',  //스키마에서 기본값으로 지정한 false
    token: '', //정수의 난수(0~999) 생성
});

router.post('/', function (req, res, next) {
    console.log('post 요청 /mail');
    mail.email=req.body.email,
    mail.name=req.body.name,
    mail.state=req.body.state,  //스키마에서 기본값으로 지정한 false
    mail.token=Math.floor(Math.random() * 1000),
    /*const mail = new Mail({
        email: req.body.email,  //화면에서 작성한 email
        name: req.body.name,    //화면에서 작성한 성명
        state: req.body.state,  //스키마에서 기본값으로 지정한 false
        token: Math.floor(Math.random() * 1000), //정수의 난수(0~999) 생성
    });*/
    mail.save() //작성된 사용자 인증 정보를 몽고디비에 저장.
    .then((result) => { //성공
        console.log(result);
        res.status(201).json(result);
        next();
    })
    .catch((err) => { //실패
        console.error(err);
        next(err);
    });
});

router.post('/', function(req, res, next){
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cjswo7119@gmail.com',  //gmail 계정 아이디를 입력
            pass: '구글비밀번호'           //gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'cjswo7119@gmail.com',    //발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email,                      //수신 메일 주소
        subject: mail.name+'Volunteer E-Mail 인증',   //제목
        text: 'http://localhost:3000/authjoin/auth?name='+mail.name+'&email='+mail.email+'&token='+mail.token      //내용
        //text: 'http://localhost:3000/authjoin/auth?name='+mail.name+'&email='+mail.email+'&token='+mail.token      //연습용 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect("/");
});

// 라우터를 내보내기.
module.exports = router;