const express = require('express'); // express 불러오기
const app = express();
const port = 3000;
const newPostingRouter = require("./routes/new_posting"); // 이렇게 페이지의 존재를 인식시켜주고 그 경로를 지정해주어야 함, 여기서는 해당 경로 앞에 /api를 붙임
const connect = require('./schemas'); // 이렇게만 쓰면 ./schemas/index와 같음 index.js가 있는지 살펴보게 됨
// const bodyParser = require('body-parser'); // 최신 버전에서는 모듈 내장되어있어서 안써도 됨
connect(); // DB 연결한 모듈 끌어옴

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date()); // request 로그 남기는 미들웨어
    next();
};
//app.use(bodyParser.urlencoded({extended: true})); // json 형식의 데이터를 
//app.use(bodyParser.json())// router에서 json으로 res하기때문에 이걸로 해석해줘야함

app.use(express.static("static")); // static과 똑같은 경로에 있는 파일들을 이 미들웨어 덕에 가져올 수 있다.
// static하게 보여줄 html, css같은 것들을 "static"이라는 폴더에서 가져옴
// 보통 index파일을 가장 먼저 찾는다고 함
app.use(express.json()); // express가 json형태로 된 body를 가져와서 사용할 수 있게 해주는 미들웨어 // json 해석은 따로 모듈 필요
app.use(express.urlencoded()); // json 형식의 데이터를 해석하기 위해서는 body parser가 필요하다.
// 다만 최신 버전의 경우 모듈 내 body parser가 내장되어 있어서 express.urlencoded 로 작성해도 문제가 없다.
// urlencoded가 필요한 이유는 아마도 ajax에서 url을 지정해서 입력후 값을 넘겨주는데 이떄 url에 입력된 값들이 모두 텍스트로 이루어져있어서 그것을 변환하고자 인듯하다

app.use(requestMiddleware);
app.use("/api", [newPostingRouter]); 


// app.get('/', (req, res) => {
//     res.send('Hello World!'); // 이것이 static 코드보다 먼저나오면 메인페이지가 보이지 않음
// });

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});



