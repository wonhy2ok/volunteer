const express = require('express');
const cors = require('cors'); //sop오류방지를 위한 cors모듈 가져오기.
const router = express.Router();

router.use(cors()); //cors 적용

router.get('/', function(req, res, next) {
    res.write('error  Page 입니다.');
    res.end();
});

// 라우터를 내보내기.
module.exports = router;