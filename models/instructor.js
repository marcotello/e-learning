var mongoose = require('mongoose');

// Instructor Schema
var InstructorSchema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  address: [{
    street_address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  }],
  username: {
    type: String
  },
  email: {
    type: String
  },
  classes: [{
    class_id: { type: [mongoose.Schema.Types.ObjectId] },
    class_title: { type: String }
  }]
});

// Get user by username
module.exports.getInstructorByUsername = function (username, callback) {
  var query = {username: username};
  Instructor.findOne(query, callback);
}

var Instructor = module.exports = mongoose.model('Instructor', InstructorSchema);
