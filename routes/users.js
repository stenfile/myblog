var express = require('express');
var router = express.Router();
var models=require('../db/model.js');
var utils=require('../utils.js');
var auth=require('../middleware/autoauth');

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * 用户注册
 */
router.get('/reg',auth.checkNotLogin, function (req, res) {
  res.render('user/reg', {title: '用户注册'});
});

/**
 * 当填写用户注册信息提交时的处理
 * 路径与上面访问的主责页面路径是一致的,只是动作是POST
 * 这种设计即是RESTful设计原则
 *
 */
router.post('/reg',auth.checkNotLogin, function (req, res,next) {
  //获取表单数据
  var user=req.body;
  if(user.password==user.repassword){
    models.User.findOne({username:user.username}, function (err, doc) {
      if(doc){
        //如果有值,表示用户名已存在
        req.flash('error','用户名已存在请重新注册');
        res.redirect('/user/reg')
      }else{
        //没有值才能够注册
        models.User.create(
            //脱库攻击
            {username:user.username, password:utils.md5(user.password),
          email:user.email,avatar:'https://s.gravatar.com/avatar/'+utils.md5(user.email)+'?s=80'}, function (err, doc) {
          if(err){
            req.flash('error','注册失败请稍后再试');
            res.redirect('/user/reg')
          }else{
            //注册成功,重定向到登录页面
            req.flash('success','注册成功请登录');
            res.redirect('/user/login');
          }
        })
      }
    })

  }else{
    //两次密码不一致
    req.flash('error','密码和确认密码不一致');
    res.redirect('/user/reg')
  }
});

/**
 * 显示用户登录表单
 */
router.get('/login',auth.checkNotLogin, function (req, res) {
  res.render('user/login', {title: '登录'});
});

/**
 * 当填写用户登录信息提交时的处理
 */
router.post('/login',auth.checkNotLogin, function (req, res) {
  var user=req.body;

  models.User.findOne({username:user.username,
    password:utils.md5(user.password)}, function (err, doc) {
    if(doc){
      //如果doc存在,那么就是登录成功
      //登陆成功后,将用户的信息放入session保存
      req.session.user=doc;
      //重定向   是服务器向客户端浏览器发出状态码是301/302的响应码
      // 告诉客户端浏览器要发出新的请求,地址是'/'也就是网站的根目录
      req.flash('success','登陆成功');
      res.redirect('/')
    }else{
      //如果doc不存在,那么就是登录失败
      req.flash('error','登陆失败,用户名或密码错误');
      res.redirect('/user/login')
    }
  });
});

router.get('/logout',auth.checkLogin, function (req, res) {
  req.session.user=null;
  res.redirect('/')
});

module.exports = router;
