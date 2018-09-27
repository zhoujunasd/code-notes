var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')

var config = require('./database/config')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var index  = require('./controller/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//{limit: '4mb'}控制最大请求体大小
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit:'4mb', extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:'asd',
  secret:'zz',
  resave: false,//是否重新保存session
  saveUninitialized: false,  //保存初始化
  cookie: { secure: false,expires: 1000*60*60*24*14 }, //是否是https协议
  // cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  store: new MongoStore({ mongooseConnection: config }) 
  //将session持久化到mongodb数据库。
}))

app.use('/', index);
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
