var createError = require('http-errors');
// 导入express，通过app=express()使用
var express = require('express');
// path中间件，用来定义绝对地址
var path = require('path');
// node.js的HTTP请求记录器中间件
var logger = require('morgan');
// session中间件，在服务端，存放cookie
var session = require('express-session')
// 将session存进mongo的中间件
var MongoStore = require('connect-mongo')(session)
// 对接收的数据进行格式转换的中间件
var bodyParser = require('body-parser')
// 
var cookieParser = require('cookie-parser');

var config = require('./database/config')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// 引入index路由文件
// var index  = require('./controller/index')
var index  = require('./routes/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
//{limit: '4mb'}控制最大请求体大小
// 使用bodyParser中间件
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit:'4mb', extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// 使用cookieParser中间件
app.use(cookieParser());
// 
app.use(express.static(path.join(__dirname, 'public')));

// 存储session，
app.use(session({
  name:'asd',//session名，可以不设置
  secret:'zz', //加密字符串
  resave: false,//是否重新保存session
  saveUninitialized: false,  //保存初始化
  cookie: { secure: false,expires: 1000*60*60*24*14 }, //secure: false是否是https协议，expires等一session的保存时间
  // cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  store: new MongoStore({ mongooseConnection: config }) 
  //将session持久化到mongodb数据库。
}))

app.use('/', index);//====================================================将index文件的路由设置为‘/’地址，
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
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

module.exports = app;
