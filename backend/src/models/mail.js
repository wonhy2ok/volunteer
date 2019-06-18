const mongoose = require('mongoose');

const { Schema } = mongoose;
const mailSchema = new Schema({
    email: { //ID로 사용할 email
        type: String,
        require: true,
        unique: true,
    },
    name: { //사용자명
        type: String,
        require: true,
    },
    state: { //false:미인증, true:인증 => true인 경우, 비밀번호변경 접근도 가능.
        type: Boolean,
        default: false, //기본값:false
    },
    token: { //사용자임을 확인하기 위한 난수의 토큰
        type: Number,
    }
})

module.exports = mongoose.model('Mail',mailSchema); //authusers 컬렉션(테이블) 생성.