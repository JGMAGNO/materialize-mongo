var mongoose = require('mongoose');
var studentModel = function () {

  var studentSchema = mongoose.Schema({

  // to do code here
  }, {versionKey: false});
 

  return mongoose.model('Student', studentSchema);
};

module.exports = new studentModel();