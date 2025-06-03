const express = require('express');
// 2.创建服务器的实例对象
const app = express();

//全局配置
const Config = require("./config");

//日志记录模块
const morgan = require('morgan');
//日志分割
const FileStreamRotator = require('file-stream-rotator')
const fs = require('fs');
const path = require('path');
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
//自定义日志格式
morgan.format('API', '[API] :method :url :status  HTTP/:http-version :remote-addr -  :response-time ms :user-agent');
app.use(morgan('API',{stream: accessLogStream}));

// 发送数据处理
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json);
// 允许跨域访问
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});
// 静态资源服务 http://localhost:30001/static/images/kitten.jpg
app.use('/static', express.static('public'))

//引入路由
const optionRouter = require('./router/index');
app.use('/api', optionRouter);

app.listen(Config.serve.port, () => {
        console.log(`Example app listening, http://${Config.serve.host}:${Config.serve.port}`)
        console.log(`Example app API use,  http://${Config.serve.host}:${Config.serve.port}/api/option?name=siteurl`)
        console.log(`Example app statics,  http://${Config.serve.host}:${Config.serve.port}/static/`)
    }
)