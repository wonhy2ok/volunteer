const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    id: { //ID로 사용할 email
        type: String,
        require: true,
        unique: true,
    },
    name: { //사용자명
        type: String,
        require: true,
    },
    password: { //비밀번호
        type: String,
    },
    provider: { //로그인 방식
        type: String,
        defaultValue: 'local',  //기본값 : 로컬 로그인
    },
    snsId: {    //sns ID
        type: String,
    }
})

module.exports = mongoose.model('User',userSchema); //authusers 컬렉션(테이블) 생성.