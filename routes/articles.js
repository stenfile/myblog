/**
 * Created by Administrator on 2016/11/17.
 */
var express = require('express');
var auth=require('../middleware/autoauth');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/add',auth.checkLogin, function (req, res) {
    res.render('article/add',{title:'文章发表'});
});

router.post('/add',auth.checkLogin, function (req, res) {

});

//router.post('/view', function (req, res) {
//
//});

module.exports = router;
