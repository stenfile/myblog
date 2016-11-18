var express = require('express');
//加载express的路由模块
var router = express.Router();
var models=require('../db/model.js');


/* GET home page. */
router.get('/', function(req, res, next) {

  models.Article.find({}).populate('user').exec(function (err, articles) {
    res.render('index', { title: 'Sten的博客',articles:articles });
  });

});

module.exports = router;
