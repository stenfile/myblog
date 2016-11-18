/**
 * Created by Administrator on 2016/11/17.
 */
var express = require('express');
var auth=require('../middleware/autoauth');
var router = express.Router();
var models=require('../db/model.js');
var utils=require('../utils.js');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/add',auth.checkLogin, function (req, res) {
    res.render('article/add',{title:'文章发表'});
});

router.post('/add',auth.checkLogin, function (req, res) {
    var article=req.body;
    models.Article.create({
        title:article.title,
        content:article.content,
        user:req.session.user._id
    }, function (err, art) {
        if(err)
        {
            req.flash('error','发布失败,请稍后再试');
            res.redirect('/article/add')
        }else
        {
            //console.log(art);
            //console.log("qqqqq");
            req.flash('success','发布成功');
            res.redirect('/')
        }
    })
});

module.exports = router;
