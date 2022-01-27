const mongoose = require("mongoose"); // MongoDB client이자 라이브러리인 mongoose를 통해 코드에서
//MongoDB 관리

const connect = () => { // ignoreUndefined덕에 undefined를 어떻게든 처리하게 두지 않고 무시 // 하지않으면 무한로딩 될 수 있었던 거 같음
    mongoose.connect("mongodb://localhost:27017/node_first", {ignoreUndefined: true}).catch((err) => {
        console.error(err);

    }); // DB에 연결, 실패 시 에러 메시지 콘솔 창에 노출
};

module.exports = connect; // connect라는 모듈을 내보내주어 다른 코드에서도 사용가능 하게 하기
// app에 연결