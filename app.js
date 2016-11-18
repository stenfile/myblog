var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//����·���ļ�  routes�ļ����������·���ļ�
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

//����session
app.use(cookieParser());
app.use(session({
  secret:'zkingblog',//����cookie,��ֹcookie���۸�
  resave:true,//��ʾÿ����������Ϻ󶼸���session����
  cookie:{maxAge:1000*60*30},//����session��Чʱ��Ϊ30����
  saveUninitialized:true,//�����´������ǻ��ʼ����session
  //��session����Ϣ���浽���ݿ���
  store: new MongoStore({url: config.dburl})
}));

//������Ҫ��ÿ��ҳ������Ⱦʱ����session�б����user����,���Կ������һ���м��,ר�Ŵ���
//session������
app.use(function(req,res,next){
  res.locals.user=req.session.user;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//���ñ���ʽ  ��Ҫ���ָ�ʽ  json �� urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//���ؽ���cookie
app.use(cookieParser());

//���þ�̬Ŀ¼
app.use(express.static(path.join(__dirname, 'public')));

//����·�ɴ���ģ��  ���з���'/'��վ��Ŀ¼��������index·��ģ�鴦��
app.use('/', index);
//���з���'/user'��վĿ¼��������users·��ģ�鴦��
app.use('/user', users);

app.use('/article', articles);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //ת����һ���м��,������ҳ�����Ⱦ
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
//��APP��¶�����
module.exports = app;
