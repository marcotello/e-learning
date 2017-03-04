var express = require('express');
var router = express.Router();

var Class = require('../models/class');
var Instructor = require('../models/instructor');
var User = require('../models/user');

router.get('/classes', function (req, res, next) {
  Instructor.getInstructorByUsername(req.user.username, function (err, instructor) {
    if(err) throw err;
    res.render('instructors/classes', {instructor, instructor});
  });
});

module.exports = router;
