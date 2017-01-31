var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = null;
  res.render('index', { user: user });
});

module.exports = router;
