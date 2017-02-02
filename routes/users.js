var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../models/user');

// Include Student Model
var User = require('../models/student');

// Include Instructor Model
var User = require('../models/instructor');

/* User Register */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

// Register User
router.post('/register', function(req, res, next) {

  console.log('Student: ' + req.body.group1);

  // console.log('Este es el request: ', req);

  // Get Form values
  var name = req.body.name;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var email2 = req.body.email2;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var password = req.body.password;
  var password2 = req.body.password2;
  var student = req.body.group1;
  //var type = req.body.type;

  // Form validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').isEmail();
  req.checkBody('email2', 'Email do not match').equals(req.body.email);
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);

  errors= req.validationErrors();

  console.log(`Errors ${errors}`);

  if(errors) {
    res.render('users/register', {
      errors: errors
    });
  }else {
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type:type
    });

    if(type === 'student') {
      console.log('Is student');
    } else {
      console.log('Is instructor');
    }

    res.render('users/account');
  }
});

/* User Login */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

module.exports = router;
