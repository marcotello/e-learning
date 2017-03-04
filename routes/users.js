var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../models/user');

// Include Student Model
var Student = require('../models/student');

// Include Instructor Model
var Instructor = require('../models/instructor');

/* User Register */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

// Register User
router.post('/register', function(req, res, next) {

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
  var type = req.body.group1;

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
      username: email,
      password: password,
      type:type
    });

    if(type === 'student') {
      console.log('Registering student...');

      var newStudent = new Student ({
        first_name: name,
        last_name: lastName,
        address: [{
          street_address: address,
          city: city,
          state: state
        }],
        email: email,
        username: email
      });

      User.saveStudent(newUser, newStudent, function () {
        console.log('Student Created');
      });

      var account = {
        user: newUser,
        profile: newStudent
      };

      var completeAddress = newStudent.address[0];

      console.log('Direccion: ' + completeAddress.street_address);

      res.render('users/account', { account: account });

    } else {
      console.log('Registering instructor...');
      var newInstructor = new Instructor({
        first_name: name,
        last_name: lastName,
        address: [{
          street_address: address,
          city: city,
          state: state
        }],
        email: email,
        username: email
      });

      User.saveInstructor(newUser, newInstructor, function () {
        console.log('Instructor Created');
      });

      res.render('users/account', { account: account });
    }
  }
});

passport.serializeUser( function(user, done) {
  done(null, user._id);
});

passport.deserializeUser( function(id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

/* User Login */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: true}), function(req, res, next) {
  console.log('Authenticating user...');
  req.flash('success_msg', 'You are now logged in');
  var userType = req.user.type;
  res.redirect(`/${userType}s/classes`);
});

passport.use(new LocalStrategy( function (username, password, done) {
  console.log('Authenticating user in passport...');
  User.getUserByUsername(username, function (err, user) {
    if(err){
      console.log('***************************** Errorrrrrrrrrrrrrrrrrrrrrrrrrrrr...............');
      throw err;
    }
    if(!user){
      return done(null, false, {message: `Unknown user: ${username}`});
    }



    User.comparePassword(password, user.password, function (err, isMatch) {
        if(err) return done(err);

        if(isMatch){
          return done(null, user);
        }else{
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
    });
  });
}));

router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

module.exports = router;
