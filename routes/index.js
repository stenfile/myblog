var express = require('express');
//加载express的路由模块
var router = express.Router();
var models=require('../db/model.js');
markdown = require('markdown').markdown;

router.get('/', function(req, res, next) {
  res.redirect('/article/list/1/2');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Article.find({}).populate('user').exec(function (err, articles) {
    articles.forEach(function (article) {
      article.content = markdown.toHTML(article.content);
    });
    res.render('index', { title: 'Sten的博客',articles:articles });
  });
});



module.exports = router;
