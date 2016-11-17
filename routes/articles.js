/**
 * Created by Administrator on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

router.get('/add', function (req, res) {
    res.render('article/add');
});

router.post('/add', function (req, res) {

});

module.exports = router;
