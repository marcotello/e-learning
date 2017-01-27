var express = require('express');
var router = express.Router();

var Class = require('../models/class');

/* GET courses page. */
router.get('/', function(req, res, next) {
  Class.getClasses( function (err, courses) {
    if(err) throw err;
    res.render('courses', { classes: courses });
  }, 3);
});

module.exports = router;
