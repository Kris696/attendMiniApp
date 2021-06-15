var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 处理post请求参数
const bodyPaser = require('body-parser');

// 引用路由模块
var checkRouter = require('./routes/check');
var statisticsRouter = require('./routes/statistics');

var app = express();

// 改写
var http = require('http');
var server = http.createServer(app);

// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 打印请求日志
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 为路由匹配请求路径
app.use('/check', checkRouter);
app.use('/statistics', statisticsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// 监听端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});