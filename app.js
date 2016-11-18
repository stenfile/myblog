var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载路由文件  routes文件夹用来存放路由文件
var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var config=require('./dbconfig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.set('view engine','html');
app.engine('html',require('ejs').__express);

//解析session
app.use(cookieParser());
app.use(session({
  secret:'zkingblog',//加密cookie,防止cookie被篡改
  resave:true,//表示每次请求处理完毕后都更新session数据
  cookie:{maxAge:1000*60*30},//设置session有效时间为30分钟
  saveUninitialized:true,//保存新创建但是会初始化的session
  //把session的信息保存到数据库中
  store: new MongoStore({url: config.dburl})
}));

//由于需要给每个页面在渲染时传递session中保存的user对象,所以可以添加一个中间件,专门处理
//session的问题
app.use(function(req,res,next){
  res.locals.user=req.session.user;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//设置表单格式  需要两种格式  json 和 urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析cookie
app.use(cookieParser());

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

//设置路由处理模块  所有访问'/'网站根目录的请求都由index路由模块处理
app.use('/', index);
//所有访问'/user'网站目录的请求都由users路由模块处理
app.use('/user', users);

app.use('/article', articles);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //转到下一个中间件,做错误页面的渲染
  next(err);
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
//将APP暴露给外界
module.exports = app;
