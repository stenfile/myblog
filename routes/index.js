var express = require('express');
//����express��·��ģ��
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MY' });
});

module.exports = router;
