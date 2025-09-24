var express = require('express');
var path  =require('path');

const app = express();
const port = 3000;
global.path = path;

const ROOT = path.resolve();
global.ROOT = ROOT;

app.set('views', path.join(ROOT, 'views')); // 뷰 파일 디렉토리
app.set('view engine', 'ejs'); // ejs 엔진 사용

/* GET home page. */
app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.use(express.static(path.join(ROOT, 'publish')));

app.listen(port, () => {
    console.log(`서버 실행, http://localhost:${port}`);
});

module.exports = app;