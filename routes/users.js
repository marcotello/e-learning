var express = require('express');
var router = express.Router();

/* User Register */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

/* User Login */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

module.exports = router;
