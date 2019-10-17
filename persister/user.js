var mongoose = require('mongoose');
var userModel = function () {

  var userSchema = mongoose.Schema({

  // to do code here
  }, {versionKey: false});
 

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();