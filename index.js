var express = require('express');
var path  =require('path');

const app = express();
app.use(express.urlencoded({ extended: true })); // URL encoded 파싱
app.use(express.json({ limit: '50mb' }));

const port = 3000;
global.path = path;

const ROOT = path.resolve();
global.ROOT = ROOT;
global.ALLOWED_METHODS = ['GET', 'POST'];
global.funcCmmn = require('./app/modules/func-common');

const routerPath = require('./app/routes/path')(express);

app.set('views', path.join(ROOT, '/app/views')); // 뷰 파일 디렉토리
app.set('view engine', 'ejs'); // ejs 엔진 사용

/* GET home page. */
app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.use('/public', express.static(path.join(ROOT, 'public')));
app.use('/path', routerPath);

app.listen(port, () => {
    console.log(`서버 실행, http://localhost:${port}`);
});

module.exports = app;